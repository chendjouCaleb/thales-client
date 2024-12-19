import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CustomerList } from "@app/Components/customers";
import {Router} from "@angular/router";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Subscription} from "rxjs";
import {CustomerPage} from "@app/customers";
import {Space} from "@entities/space";
import {SearchBox} from "@app/ui/search-box/search-box";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  template: `
    <div class="p-3" >
      <div class="fontSize-24" style="padding-bottom: 16px">Tous les contacts</div>

      <div>
        <MySearchBox style="border-color: rgba(255, 255, 255, 0.3); width: 256px" >
          <input type="text" #searchBoxInput placeholder="Chercher un client"
                 [(ngModel)]="q" (ngModelChange)="filter($event)"
          >
        </MySearchBox>
      </div>

      <CustomerList [displayedColumns]="displayedColumns" (onItemClick)="navigate($event)" class="mt-3"
                    [params]="params"
      [parentHost]="_elementRef.nativeElement"
      ></CustomerList>
    </div>
  `,
  standalone: true,
  imports: [
    CustomerList,
    SearchBox,
    ReactiveFormsModule,
    FormsModule
  ],
  selector: 'CustomerFavoritePage'
})
export class CustomerAllPage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  private archiveAddSubscription: Subscription;

  @ViewChild(CustomerList)
  customerList: CustomerList
  space: Space;
  q: string = ''
  params = {

  }
  constructor(private router: Router,
              private parent: CustomerPage,
              private _changeDetector: ChangeDetectorRef,
              public _elementRef: ElementRef<HTMLElement>,
              private customerService: CustomerService) {
    this.space = this.parent.space;
    this.params = {spaceId: this.space.id }
  }

  navigate(customer: Customer) {
    //this.router.navigateByUrl(`${customer.id}`)
    this.router.navigate(['/spaces', this.space.identifier, 'customers',  customer.id])
  }

  ngOnInit() {
    this.archiveAddSubscription = this.customerService.customerArchiveAdd.subscribe(c => {
      this.customerList.remove(c)
    });
  }

  timeoutID;
  filter(event) {
    this.params = { ...this.params, q : this.q }
    clearTimeout(this.timeoutID)
    this.timeoutID = setTimeout(() => {
      console.log('search query: ', this.q)
      this.customerList.reload()
    }, 500)
    this._changeDetector.markForCheck();
  }

  ngOnDestroy() {
    this.archiveAddSubscription.unsubscribe();
  }
}
