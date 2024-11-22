import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";
import {Router} from "@angular/router";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Subscription} from "rxjs";

@Component({
  template: `
    <div class="p-3">
      <div class="fontSize-24" style="padding-bottom: 16px">Tous les contacts</div>
      <CustomerList [displayedColumns]="displayedColumns" (onItemClick)="navigate($event)"></CustomerList>
    </div>
  `,
  standalone: true,
  imports: [
    CustomerListModule,
    CustomerList
  ],
  selector: 'CustomerFavoritePage'
})
export class CustomerAllPage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  private archiveAddSubscription: Subscription;

  @ViewChild(CustomerList)
  customerList: CustomerList

  constructor(private router: Router, private customerService: CustomerService) {
  }

  navigate(customer: Customer) {
    this.router.navigateByUrl(`customers/${customer.id}`)
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
