import {Component} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";

@Component({
  template: `
    <div class="fontSize-24" style="padding-bottom: 16px">Clients archivés</div>
    <CustomerList [displayedColumns]="displayedColumns" [params]="params"></CustomerList>
  `,
  standalone: true,
  imports: [
    CustomerListModule,
    CustomerList
  ],
  selector: 'CustomersArchivedPage'
})
export class CustomerArchivePage {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  params = {
    archived: true
  }
}
