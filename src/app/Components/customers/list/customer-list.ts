import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from "@angular/core";

import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {OrderBy} from "@app/models";

@Component({
  templateUrl: 'customer-list.html',
  selector: 'CustomerList',
  styleUrls: [ "customer-list.scss"]
})
export class CustomerList implements OnInit {
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  isLoading = true;
  isRangeLoading = false

  customers: Customer[] = []

  get _customers(): Customer[] {
    return this.customers;
  }

  orderby: OrderBy = { by: "ID", asc: false }

  async changeOrderBy(value: string) {
    if(value == this.orderby.by) {
      this.orderby.asc = !this.orderby.asc
    }else {
      this.orderby.by = value
    }
    this.params = {...this.params, orderBy: this.orderby.by, asc: this.orderby.asc }

    await this.reload()
  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  @ViewChild("container")
  container: ElementRef<HTMLElement>

  total: number = 0;

  get hasMore(): boolean {
    return this.customers.length < this.total
  }

  display(name: string) {
    return this.columns.indexOf(name) > 0
  }


  columns: string[] = [ 'code', 'name',  'birthDate',  'sex', 'address', 'job', 'passport', 'createdAt', 'action'];

  constructor(private _service: CustomerService,
              private _router: Router,
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
    this.customers = []
    await this.getFirstRange()
  }

  async getFirstRange() {
    this.isLoading = true
    let params = {...this.params,
      take: 7,
      skip: this.customers.length
    }
    let range = await this._service.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
    this.isLoading = false;
  }

  async getRange() {
    this.isRangeLoading = true
    let params = {...this.params,
      take: 7,
      skip: this.customers.length
    }
    let range = await this._service.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
    this.isRangeLoading = false;
  }


  unshift(customer: Customer) {
    this.customers.unshift(customer);
  }

  remove(customer: Customer) {
    this.customers = this.customers.filter(p => p.id !== customer.id)
  }


  onClick(row) {
    console.log(row)
  }
}
