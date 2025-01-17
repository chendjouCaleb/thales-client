import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  isDevMode,
  LOCALE_ID, OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";

import {Debt} from "@entities/finance/debt";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe, DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {environment} from "../../../../environments/environment";
import {
  CheckIcon,
  CircleAlert,
  EllipsisVerticalIcon,
  LucideAngularModule,
  MoveDownIcon,
  MoveUpIcon,
  Trash2Icon
} from "lucide-angular";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {Dropdown, MyBadge} from "@app/NeoUI";
import {DebtService} from "@app/services/debt.service";
import {Subscription} from "rxjs";
import {DebtOverviewLauncher} from "src/app/Components/debts/overview";
import {DebtEventStore} from "@app/services/debt-event-store";


const DEBT_RANGE_SIZE = isDevMode() ? 10 : 30;

@Component({
  templateUrl: 'debt-list.html',
  selector: 'DebtList, [DebtList]',
  standalone: true,
  imports: [LucideAngularModule,
    MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem, CurrencyPipe, RouterLink, MyBadge],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'}, DebtOverviewLauncher,
  ]
})
export class DebtList implements OnInit, AfterViewInit, OnDestroy {
  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];
  icons = { MoveUpIcon, MoveDownIcon, EllipsisVerticalIcon,
    Trash2Icon, CircleAlert, CheckIcon  }

  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  @Input()
  filter: (debt: Debt) => boolean = () => false

  @Input()
  mode: 'card' | 'table' = 'card'

  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>


  get _debts(): Debt[] {
    return this.debts;
  }

  deleteSubscription: Subscription
  addSubscription: Subscription
  orderby: String[] = ["ID", "DESC"]
  debts: Debt[] = []
  total: number = 0;

  get hasMore(): boolean {
    return this.debts.length < this.total
  }

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: DEBT_RANGE_SIZE,
      skip: this.debts.length
    }
    let range = await this._service.listAsync(params);
    this.debts.push(...range.debts)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.debts.length;
    let params = {...this.params, includeCustomer: true, includeEmployee: true, includeAgency: true,
      take: DEBT_RANGE_SIZE,
      skip: this.debts.length
    }
    let range = await this._service.listAsync(params);
    this.debts.push(...range.debts)
    this.total = range.total;
    console.log(`Load debts range: [${from}, ${this.debts.length}]`)
  })


  constructor(private _service: DebtService,
              private _router: Router,
              private _debtEventStore: DebtEventStore,
              public readonly detailsLauncher: DebtOverviewLauncher,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    await this.loadFirstRange()
    this.deleteSubscription = this._debtEventStore.debtDelete.subscribe(deleted => {
      this.debts = this._debts.filter(e => e.id !== deleted.id)
    });

    this.addSubscription = this._debtEventStore.debtAdd.subscribe(newDebt => {
      if(this.filter(newDebt) && !this._debts.find(e => e.id === newDebt.id)) {
        this._debts.unshift(newDebt);
      }
    })
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe();
    this.addSubscription.unsubscribe();
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
    await sleep(100)
    let visible = isVisibleElement(this.rangeObserverThumbRef.nativeElement)
    while (visible && this.hasMore) {
      await this.getRangeTask.launch()
      await sleep(100)
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
    this.debts = []
    await this.getFirstRangeTask.launch()
  }

  unshift(debt: Debt) {
    this.debts.unshift(debt);
  }

  remove(debt: Debt) {
    this.debts = this.debts.filter(p => p.id !== debt.id)
  }

  details(debt: Debt) {
    this.detailsLauncher.launch(debt)
  }


  delete(debt: Debt) {
    // this._uiService.deleteDebt(debt).subscribe(deleted => {
    //   if (deleted) {
    //     this.remove(debt);
    //   }
    // })
  }


  printPDF(debt: Debt) {
   this._document.defaultView.open(`${environment.serverUrl}/debts/${debt.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }

  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }
}
