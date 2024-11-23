import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  isDevMode,
  LOCALE_ID,
  OnInit,
  ViewChild
} from "@angular/core";

import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {PaymentUIService} from "@app/Components";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe, DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {environment} from "../../../../environments/environment";
import {icons, LucideAngularModule} from "lucide-angular";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {Dropdown} from "@app/NeoUI";



const PAYMENT_RANGE_SIZE = isDevMode() ? 10 : 30;

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList',
  styleUrls: [ "payment-list.scss"],
  standalone: true,
  imports: [LucideAngularModule,
    MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem, CurrencyPipe, RouterLink],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
  ]
})
export class PaymentsList implements OnInit, AfterViewInit {
  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];


  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>


  get _payments(): Payment[] {
    return this.payments;
  }

  orderby: String[] = ["ID", "DESC"]
  payments: Payment[] = []
  total: number = 0;

  get hasMore(): boolean {
    return this.payments.length < this.total
  }

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: PAYMENT_RANGE_SIZE,
      skip: this.payments.length
    }
    let range = await this._service.listAsync(params);
    this.payments.push(...range.payments)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.payments.length;
    let params = {...this.params, includeCustomer: true, includeEmployee: true, includeAgency: true,
      take: PAYMENT_RANGE_SIZE,
      skip: this.payments.length
    }
    let range = await this._service.listAsync(params);
    this.payments.push(...range.payments)
    this.total = range.total;
    console.log(`Load payments range: [${from}, ${this.payments.length}]`)
  })


  constructor(private _service: PaymentService,
              private _router: Router,
              private _uiService: PaymentUIService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    await this.loadFirstRange()
  }

  ngAfterViewInit() {
    // if(this.parentHost == null) {
    //   throw Error('a ParentHost is required')
    // }
    let intersectionObserver = new IntersectionObserver(entries => {
      console.log('Intersection append')
      if (entries[0].intersectionRatio <= 0) return;
      if(this.getFirstRangeTask.success && !this.getRangeTask.loading && this.hasMore) {
        this.loadRange().then()
      }
    }, {root: null, threshold: 0.1});

    intersectionObserver.observe(this.rangeObserverThumbRef.nativeElement)
  }

  async loadFirstRange() {
    await this.getFirstRangeTask.launch()
    await sleep(500)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(500)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }

  async loadRange() {
    await this.getRangeTask.launch()
    await sleep(200)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(200)
      visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    }
  }

  async changeOrderBy(value: String) {
    if(value == this.orderby[0]) {
      this.orderby[1] = this.orderby[1] == "ASC" ? "DESC" : "ASC"
    }else {
      this.orderby = [value, "DESC"]
    }
    this.params = {...this.params, orderBy: this.orderby[0], asc: this.orderby[1] === "ASC"}

    await this.reload()
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  async reload() {
    this.total = 0
    this.payments = []
    await this.getFirstRangeTask.launch()
  }

  unshift(payment: Payment) {
    this.payments.unshift(payment);
  }

  remove(payment: Payment) {
    this.payments = this.payments.filter(p => p.id !== payment.id)
  }


  delete(payment: Payment) {
    this._uiService.deletePayment(payment).subscribe(deleted => {
      if (deleted) {
        this.remove(payment);
      }
    })
  }


  printPDF(payment: Payment) {
   this._document.defaultView.open(`${environment.serverUrl}/payments/${payment.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }

  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }

  protected readonly icons = icons;
}
