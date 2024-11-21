import {Component, ElementRef, HostListener, Inject, Input, LOCALE_ID, OnInit, ViewChild} from "@angular/core";

import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {PaymentUIService} from "../payment-u-i.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {PaymentViewModel} from "@entities/view-models";

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList',
  styleUrls: [ "payment-list.scss"],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
  ]
})
export class PaymentsList implements OnInit {
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  isLoading = true;
  isRangeLoading = false

  selectedPayment: PaymentViewModel;
  payments: Payment[] = []

  get _payments(): Payment[] {
    return this.payments;
  }

  orderby: String[] = ["ID", "DESC"]

  async changeOrderBy(value: String) {
    if(value == this.orderby[0]) {
      this.orderby[1] = this.orderby[1] == "ASC" ? "DESC" : "ASC"
    }else {
      this.orderby = [value, "DESC"]
    }
    this.params = {...this.params, orderBy: this.orderby[0], asc: this.orderby[1] === "ASC"}

    await this.reload()
  }

  @HostListener("scroll")
  async onScroll(event) {
    let scrollTop = this.host.scrollTop;
    let isAtBottom = Math.abs(this.host.scrollHeight - this.host.clientHeight - this.host.scrollTop) <= 1;

    if (isAtBottom) {
      console.log("Bottom reached: ", scrollTop + this.host.offsetHeight, this.host.scrollHeight)
      if(this.hasMore && !this.isRangeLoading){
        this.getRange()

      }
    }
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  @ViewChild("container")
  container: ElementRef<HTMLElement>

  total: number = 0;

  get hasMore(): boolean {
    return this.payments.length < this.total
  }


  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  constructor(private _service: PaymentService,
              private _router: Router,
              private _uiService: PaymentUIService,
              private _elementRef: ElementRef<HTMLElement>,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    await this.getFirstRange()

  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  async reload() {
    this.total = 0
    this.payments = []
    await this.getFirstRange()
  }

  async getFirstRange() {
    this.isLoading = true
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: 7,
      skip: this.payments.length
    }
    let range = await this._service.listAsync(params);
    this.payments.push(...range.payments)
    this.total = range.total
    this.isLoading = false;
  }

  async getRange() {
    this.isRangeLoading = true
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: 7,
      skip: this.payments.length
    }
    let range = await this._service.listAsync(params);
    this.payments.push(...range.payments)
    this.total = range.total
    this.isRangeLoading = false;
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
}
