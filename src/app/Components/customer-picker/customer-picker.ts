import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {CustomerService} from "@app/services";
import {Customer} from "../../../entities";
import {MatDialogContent, MatDialogRef} from "@angular/material/dialog";

import {LucideAngularModule, SearchIcon,} from "lucide-angular";
import {Task} from "@app/utils";
import {FormsModule} from "@angular/forms";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {Button} from "@app/ui";
import {DialogRef} from "@angular/cdk/dialog";

const TAKE = 5;
@Component({
  templateUrl: 'customer-picker.html',
  styleUrl: 'customer-picker.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    LucideAngularModule,
    FormsModule,
    MatSelectionList,
    MatListOption,
    MatDialogContent,
    MatProgressSpinner,
    NgIf,
    Button,
    NgForOf
  ],
  standalone: true
})
export class CustomerPicker implements OnInit, AfterViewInit {
  icons = { SearchIcon }
  customers: Customer[] = [];

  selected: Customer[] = [];
  filterValue: string = '';

  total: number = 0;
  params: any = {}

  @ViewChild(('parent'))
  contentViewRef: ElementRef<HTMLElement>

  @ViewChild('rangeObserver')
  rangeObserverRef: ElementRef<HTMLElement>

  getFirstRange = new Task<void>(async () => {
    let params = {
      ...this.params,
      take: 8,
      skip: 0
    }
    let range = await this._customerService.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
    this._changeDetector.markForCheck()
  })

  getRange = new Task<void>(async () => {
    let params = {
      ...this.params,
      take: 8,
      skip: this.customers.length
    }
    let range = await this._customerService.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
    this._changeDetector.markForCheck()
  })

  get isLoading(): boolean {
    return this.getFirstRange.loading || this.getRange.loading;
  }

  get hasMore(): boolean {
    return this.customers.length < this.total;
  }

  constructor(private _customerService: CustomerService,
              private _changeDetector: ChangeDetectorRef,
              private _dialogRef: DialogRef<Customer, CustomerPicker>) {
  }



  async ngOnInit() {
    this.getFirstRange.launch()
  }

  async reset() {
    this.customers = [];
    this.getFirstRange.launch()
  }

  ngAfterViewInit() {
    let intersectionObserver = new IntersectionObserver(entries => {
      console.log('Intersection append')
      if (entries[0].intersectionRatio <= 0) return;
      if(this.getFirstRange.success && !this.getRange.loading && this.hasMore) {
        this.getRange.launch()
      }
    }, {root: this.contentViewRef.nativeElement, threshold: 0.1});

    intersectionObserver.observe(this.rangeObserverRef.nativeElement)
  }

  timeoutID;
  filter(event) {
    this.params = { ...this.params, searchQuery : this.filterValue }
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(() => {
      console.log('search query: ', this.filterValue)
      this.reset()
    }, 1000)
    this._changeDetector.markForCheck();
  }

  close() {
    this._dialogRef.close(this.selected[0]);
  }

  cancel() {
    this._dialogRef.close()
  }
}
