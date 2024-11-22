import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {CustomerToolbar} from "@app/customers/toolbar/customer-toolbar";
import {MenuDrawer, MenuDrawerItem} from "@app/ui";
import {LucideAngularModule, PlusIcon, UserIcon, FolderIcon, ArchiveIcon, SettingsIcon, StarIcon} from "lucide-angular";
import {Button} from "@app/ui/button/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CustomerListModule } from "@app/Components/customers";
import {CustomerStatisticsModel} from "@entities/view-models";
import {Task} from "@app/utils";
import {CustomerService} from "@app/services";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'customer.page.html',
  standalone: true,
  selector: 'CustomerPage',
  styleUrl: 'customer.page.scss',
  imports: [CustomerToolbar, MenuDrawer, MenuDrawerItem, LucideAngularModule, Button,
    RouterOutlet, CustomerListModule, RouterLink, RouterLinkActive, NgIf
  ]
})
export class CustomerPage implements OnInit, OnDestroy{

  icon = {
    PlusIcon, UserIcon, FolderIcon, ArchiveIcon, StarIcon
  }
  customerService = inject(CustomerService)

  getStatisticsTask = new Task<CustomerStatisticsModel>(async () => {
    this.statistics = await this.customerService.getStatisticsAsync();
    return this.statistics
  })

  statistics: CustomerStatisticsModel;

  private archiveAddSubscription: Subscription;
  private archiveRemoveSubscription: Subscription;
  private favoriteAddSubscription: Subscription;
  private favoriteRemoveSubscription: Subscription;

  ngOnInit() {
    this.getStatisticsTask.launch();
    this.archiveAddSubscription = this.customerService.customerArchiveAdd.subscribe(c => {
      this.statistics.archiveCount += 1;
    });
    this.archiveRemoveSubscription = this.customerService.customerArchiveRemove.subscribe(c => {
      this.statistics.archiveCount -= 1;
    });

    this.favoriteAddSubscription = this.customerService.customerFavoriteAdd.subscribe(c => {
      this.statistics.favoriteCount += 1;
    });
    this.favoriteRemoveSubscription = this.customerService.customerFavoriteRemove.subscribe(c => {
      this.statistics.favoriteCount -= 1;
    });
  }

  ngOnDestroy(): void {
    this.archiveAddSubscription.unsubscribe()
  }
}
