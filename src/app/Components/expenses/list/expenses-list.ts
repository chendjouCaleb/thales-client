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

import {Expense} from "@entities/expense";
import {Router, RouterLink} from "@angular/router";
import {CurrencyPipe, DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {sleep, Task} from "@app/utils";
import {isVisibleElement} from "@app/utils/dom";
import {environment} from "../../../../environments/environment";
import {EllipsisVerticalIcon, LucideAngularModule, MoveDownIcon, MoveUpIcon, Trash2Icon} from "lucide-angular";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {Dropdown} from "@app/NeoUI";
import {ExpenseService} from "@app/services/expense.service";


const EXPENSE_RANGE_SIZE = isDevMode() ? 10 : 30;

@Component({
  templateUrl: 'expenses-list.html',
  selector: 'ExpenseList, [ExpenseList]',
  standalone: true,
  imports: [LucideAngularModule,
    MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem, CurrencyPipe, RouterLink],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr'},
  ]
})
export class ExpensesList implements OnInit, AfterViewInit {
  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];
  icons = { MoveUpIcon, MoveDownIcon, EllipsisVerticalIcon, Trash2Icon }

  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];


  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>


  get _expenses(): Expense[] {
    return this.expenses;
  }

  orderby: String[] = ["ID", "DESC"]
  expenses: Expense[] = []
  total: number = 0;

  get hasMore(): boolean {
    return this.expenses.length < this.total
  }

  getFirstRangeTask = new Task(async () => {
    let params = {...this.params, includeCustomer: true, includeEmployee: true,
      take: EXPENSE_RANGE_SIZE,
      skip: this.expenses.length
    }
    let range = await this._service.listAsync(params);
    this.expenses.push(...range.expenses)
    this.total = range.total
  });

  getRangeTask = new Task(async () => {
    let from = this.expenses.length;
    let params = {...this.params, includeCustomer: true, includeEmployee: true, includeAgency: true,
      take: EXPENSE_RANGE_SIZE,
      skip: this.expenses.length
    }
    let range = await this._service.listAsync(params);
    this.expenses.push(...range.expenses)
    this.total = range.total;
    console.log(`Load expenses range: [${from}, ${this.expenses.length}]`)
  })


  constructor(private _service: ExpenseService,
              private _router: Router,
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
    this.expenses = []
    await this.getFirstRangeTask.launch()
  }

  unshift(expense: Expense) {
    this.expenses.unshift(expense);
  }

  remove(expense: Expense) {
    this.expenses = this.expenses.filter(p => p.id !== expense.id)
  }


  delete(expense: Expense) {
    // this._uiService.deleteExpense(expense).subscribe(deleted => {
    //   if (deleted) {
    //     this.remove(expense);
    //   }
    // })
  }


  printPDF(expense: Expense) {
   this._document.defaultView.open(`${environment.serverUrl}/expenses/${expense.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }

  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }
}
