import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {CustomerList } from "@app/Components/customers";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CustomerService} from "@app/services";
import {Customer} from "@entities/customer";
import {CustomerPage} from "@app/customers";
import {Space} from "@entities/space";

@Component({
  template: `
    <div class="p-3">
      <div class="fontSize-24" style="padding-bottom: 16px">Clients archivés</div>
      <CustomerList [displayedColumns]="displayedColumns" [params]="params" (onItemClick)="navigate($event)"></CustomerList>
    </div>
  `,
  standalone: true,
  imports: [
    CustomerList
  ],
  selector: 'CustomersArchivedPage'
})
export class CustomerArchivePage implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'phone', 'email', 'updatedAt', 'action'];
  params: any = {
    archived: true
  }

  private archiveRemoveSubscription: Subscription;

  @ViewChild(CustomerList)
  customerList: CustomerList

  space: Space;

  constructor(private router: Router, private customerService: CustomerService,
              private parent: CustomerPage) {
    this.space = this.parent.space;
    this.params = {...this.params, spaceId: this.space.id }
  }

  navigate(customer: Customer) {
    this.router.navigate(['/spaces', this.parent.space.identifier, 'customers',  customer.id])
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
