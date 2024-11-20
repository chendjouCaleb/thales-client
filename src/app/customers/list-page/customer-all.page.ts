import {Component} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";
import {Router} from "@angular/router";
import {Customer} from "@entities/customer";

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
export class CustomerAllPage {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];

  constructor(private router: Router) {
  }

  navigate(customer: Customer) {
    this.router.navigateByUrl(`customers/${customer.id}`)
  }
}
