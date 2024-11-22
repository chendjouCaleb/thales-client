import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CustomerList, CustomerListModule} from "@app/Components/customers";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CustomerService} from "@app/services";

@Component({
  template: `
    <div class="p-3">
      <div class="fontSize-24" style="padding-bottom: 16px">Clients archivés</div>
      <CustomerList [displayedColumns]="displayedColumns" [params]="params"></CustomerList>
    </div>
  `,
  standalone: true,
  imports: [
    CustomerListModule,
    CustomerList
  ],
  selector: 'CustomersArchivedPage'
})
export class CustomerArchivePage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  params = {
    archived: true
  }

  private archiveRemoveSubscription: Subscription;

  @ViewChild(CustomerList)
  customerList: CustomerList

  constructor(private router: Router, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.archiveRemoveSubscription = this.customerService.customerArchiveRemove.subscribe(c => {
      this.customerList.remove(c)
    });
  }

  ngOnDestroy() {
    this.archiveRemoveSubscription.unsubscribe();
  }
}
