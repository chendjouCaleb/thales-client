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

import {Income} from "@entities/finance/income";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe, DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {environment} from "../../../../environments/environment";
import {EllipsisVerticalIcon, LucideAngularModule, MoveDownIcon, MoveUpIcon, Trash2Icon} from "lucide-angular";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {Dropdown} from "@app/NeoUI";
import {IncomeService} from "@app/services/income.service";
import {IncomeDetailsLauncher} from "@app/Components/incomes/details/income-details.launcher";
import {Subscription} from "rxjs";


const INCOME_RANGE_SIZE = isDevMode() ? 10 : 30;

@Component({
  templateUrl: 'incomes-list.html',
  selector: 'IncomeList, [IncomeList]',
  standalone: true,
  imports: [LucideAngularModule,
    MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem, CurrencyPipe, RouterLink],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'}, IncomeDetailsLauncher,
  ]
})
export class IncomesList implements OnInit, AfterViewInit, OnDestroy {
  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];
  icons = { MoveUpIcon, MoveDownIcon, EllipsisVerticalIcon, Trash2Icon }

  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  @Input()
  filter: (income: Income) => boolean = () => false


  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>


  get _incomes(): Income[] {
    return this.incomes;
  }

  deleteSubscription: Subscription
  addSubscription: Subscription
  orderby: String[] = ["ID", "DESC"]
  incomes: Income[] = []
  total: number = 0;

  get hasMore(): boolean {
    return this.incomes.length < this.total
  }

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: INCOME_RANGE_SIZE,
      skip: this.incomes.length
    }
    let range = await this._service.listAsync(params);
    this.incomes.push(...range.incomes)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.incomes.length;
    let params = {...this.params, includeCustomer: true, includeEmployee: true, includeAgency: true,
      take: INCOME_RANGE_SIZE,
      skip: this.incomes.length
    }
    let range = await this._service.listAsync(params);
    this.incomes.push(...range.incomes)
    this.total = range.total;
    console.log(`Load incomes range: [${from}, ${this.incomes.length}]`)
  })


  constructor(private _service: IncomeService,
              private _router: Router,
              public readonly detailsLauncher: IncomeDetailsLauncher,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    await this.loadFirstRange()
    this.deleteSubscription = this._service.incomeDelete.subscribe(deleted => {
      this.incomes = this._incomes.filter(e => e.id !== deleted.id)
    });

    this.addSubscription = this._service.incomeAdd.subscribe(newIncome => {
      if(this.filter(newIncome) && !this._incomes.find(e => e.id === newIncome.id)) {
        this._incomes.unshift(newIncome);
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
    this.incomes = []
    await this.getFirstRangeTask.launch()
  }

  unshift(income: Income) {
    this.incomes.unshift(income);
  }

  remove(income: Income) {
    this.incomes = this.incomes.filter(p => p.id !== income.id)
  }

  details(income: Income) {
    this.detailsLauncher.launch(income)
  }


  delete(income: Income) {
    // this._uiService.deleteIncome(income).subscribe(deleted => {
    //   if (deleted) {
    //     this.remove(income);
    //   }
    // })
  }


  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }
}
