import {Component} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";

@Component({
  template: `
    <div class="p-3">
      <div class="fontSize-24" style="padding-bottom: 16px">Tous les contacts</div>
      <CustomerList [displayedColumns]="displayedColumns"></CustomerList>
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
}
