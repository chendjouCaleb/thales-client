import {Component} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";

@Component({
  template: `
    <div class="fontSize-24" style="padding-bottom: 16px">Clients favoris</div>
    <CustomerList [displayedColumns]="displayedColumns" [params]="params"></CustomerList>
  `,
  standalone: true,
  imports: [
    CustomerListModule,
    CustomerList
  ],
  selector: 'CustomersFavoritePage'
})
export class CustomerFavoritePage {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  params = {
    favorite: true
  }
}
