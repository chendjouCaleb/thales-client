import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CustomerList } from "@app/Components/customers";
import {Router} from "@angular/router";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Subscription} from "rxjs";
import {CustomerPage} from "@app/customers";
import {Space} from "@entities/space";

@Component({
  template: `
    <div class="p-3" >
      <div class="fontSize-24" style="padding-bottom: 16px">Tous les contacts</div>
      <CustomerList [displayedColumns]="displayedColumns" (onItemClick)="navigate($event)"
      [parentHost]="_elementRef.nativeElement"
      ></CustomerList>
    </div>
  `,
  standalone: true,
  imports: [
    CustomerList
  ],
  selector: 'CustomerFavoritePage'
})
export class CustomerAllPage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  private archiveAddSubscription: Subscription;

  @ViewChild(CustomerList)
  customerList: CustomerList
  space: Space
  constructor(private router: Router,
              private parent: CustomerPage,
              public _elementRef: ElementRef<HTMLElement>,
              private customerService: CustomerService) {
    this.space = this.parent.space
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

  ngOnDestroy() {
    this.archiveAddSubscription.unsubscribe();
  }
}
