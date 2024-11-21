import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from "@angular/core";
import {
  LucideAngularModule, PlusIcon, UserIcon, FolderIcon, ArchiveIcon, SettingsIcon,
  EllipsisVertical,
  ArchiveRestore, FolderXIcon, Trash2Icon,
  StarIcon, FolderInputIcon, PencilIcon
} from "lucide-angular";


import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Router} from "@angular/router";
import {DOCUMENT, NgForOf, NgIf} from "@angular/common";
import {OrderBy} from "@app/models";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {CustomerArchiveDialogLauncher} from "@app/customers/archive";
import {Dropdown} from "@app/NeoUI";

@Component({
  templateUrl: 'customer-list.html',
  selector: 'CustomerList',
  styleUrls: [ "customer-list.scss"],
  imports: [LucideAngularModule, MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem],
  providers: [ CustomerArchiveDialogLauncher ],
  standalone: true
})
export class CustomerList implements OnInit {
  icon = {ArchiveIcon, StarIcon, SettingsIcon, EllipsisVertical, FolderIcon,
    ArchiveRestore, FolderXIcon, Trash2Icon, FolderInputIcon, PencilIcon }
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  @Output()
  onArchivedChange = new EventEmitter<Customer>()

  @Output()
  onFavoriteChange = new EventEmitter<Customer>()

  @Output()
  onItemClick = new EventEmitter<Customer>()

  isLoading = true;
  isRangeLoading = false

  customers: Customer[] = []

  hoverIndex: number | null = null

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
    return this.displayedColumns.indexOf(name) > -1
  }


  columns: string[] = [ 'code', 'name',  'birthDate',  'sex', 'address', 'job', 'passport', 'createdAt', 'action'];

  constructor(private _service: CustomerService,
              private _router: Router,
              private _archiveDialog: CustomerArchiveDialogLauncher,
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
    let params = {
      ...this.params,
      take: 30,
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


  async toggleFavorite(customer: Customer) {
    await this._service.toggleFavoriteAsync(customer);
    customer.isFavorite = !customer.isFavorite;
    this.onFavoriteChange.emit(customer);
  }

  toggleArchived(customer: Customer) {

  }

  archive(customer: Customer) {
    const dialogRef = this._archiveDialog.launch(customer);
    dialogRef.subscribe((result => {
      customer.isArchived = true
      this.onArchivedChange.emit(customer)
    }))
  }

  restoreArchived(customer: Customer) {
    const dialogRef = this._archiveDialog.launchRestore(customer);
    dialogRef.subscribe((result => {
      customer.isArchived = false
      this.onArchivedChange.emit(customer)
    }))
  }

  onClick(row) {
    console.log(row)
  }

  protected readonly settingsIcon = SettingsIcon;
}


export class Task<TResult> {

}
