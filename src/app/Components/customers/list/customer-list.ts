import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from "@angular/core";
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
import {Task} from "@app/utils";

@Component({
  templateUrl: 'customer-list.html',
  selector: 'CustomerList',
  styleUrls: [ "customer-list.scss"],
  imports: [LucideAngularModule, MatProgressSpinner, NgIf, NgForOf, IconButton, Dropdown, Menu, MenuItem],
  providers: [ CustomerArchiveDialogLauncher ],
  standalone: true
})
export class CustomerList implements OnInit, AfterViewInit {
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

  customers: Customer[] = []

  hoverIndex: number | null = null

  orderBy: OrderBy = { by: "ID", asc: false }

  async changeOrderBy(value: string) {
    if(value == this.orderBy.by) {
      this.orderBy.asc = !this.orderBy.asc
    }else {
      this.orderBy.by = value
    }
    this.params = {...this.params, orderby: this.orderBy.by, asc: this.orderBy.asc }

    await this.reload()
  }


  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  @ViewChild("container")
  container: ElementRef<HTMLElement>

  @ViewChild('rangeObserverThumb')
  rangeObserverThumbRef: ElementRef<HTMLElement>

  @Input()
  parentHost: HTMLElement

  total: number = 0;

  get hasMore(): boolean {
    return this.customers.length < this.total
  }

  display(name: string) {
    return this.displayedColumns.indexOf(name) > -1
  }

  getFirstRangeTask = new Task(async () => {
    let params = {
      ...this.params,
      take: 20,
      skip: this.customers.length
    }
    let range = await this._service.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
  })

  getRangeTask = new Task(async () => {
    let params = {...this.params,
      take: 20,
      skip: this.customers.length
    }
    let range = await this._service.getRangeAsync(params);
    this.customers.push(...range.customers)
    this.total = range.total
  })


  columns: string[] = [ 'code', 'name',  'birthDate',  'sex', 'address', 'job', 'passport', 'createdAt', 'action'];

  constructor(private _service: CustomerService,
              private _router: Router,
              private _archiveDialog: CustomerArchiveDialogLauncher,
              private _elementRef: ElementRef<HTMLElement>,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    this.getFirstRangeTask.launch().then()
  }

  ngAfterViewInit() {
    // if(this.parentHost == null) {
    //   throw Error('a ParentHost is required')
    // }
    let intersectionObserver = new IntersectionObserver(entries => {
      console.log('Intersection append')
      if (entries[0].intersectionRatio <= 0) return;
      if(this.getFirstRangeTask.success && !this.getRangeTask.loading && this.hasMore) {
        this.getRangeTask.launch()
      }
    }, {root: null, threshold: 0.1});

    intersectionObserver.observe(this.rangeObserverThumbRef.nativeElement)
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  async reload() {
    this.total = 0
    this.customers = []
    await this.getFirstRangeTask.launch()
  }

  remove(customer: Customer) {
    this.customers = this.customers.filter(p => p.id !== customer.id);
    //this.total -= 1;
  }


  async toggleFavorite(customer: Customer) {
    await this._service.toggleFavoriteAsync(customer);
    customer.isFavorite = !customer.isFavorite;
    this.onFavoriteChange.emit(customer);
  }

  archive(customer: Customer) {
    const dialogRef = this._archiveDialog.launch(customer);
    dialogRef.subscribe((() => {
      customer.isArchived = true
      this.onArchivedChange.emit(customer)
    }))
  }

  restoreArchived(customer: Customer) {
    const dialogRef = this._archiveDialog.launchRestore(customer);
    dialogRef.subscribe((() => {
      customer.isArchived = false
      this.onArchivedChange.emit(customer)
    }))
  }
}
