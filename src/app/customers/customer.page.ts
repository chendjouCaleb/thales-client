import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {CustomerToolbar} from "@app/customers/toolbar/customer-toolbar";
import {MenuDrawer, MenuDrawerItem} from "@app/ui";
import {LucideAngularModule, PlusIcon, UserIcon, FolderIcon, ArchiveIcon, SettingsIcon, StarIcon} from "lucide-angular";
import {Button} from "@app/ui/button/button";
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CustomerStatisticsModel} from "@entities/view-models";
import {Task} from "@app/utils";
import {CustomerService, SpaceHttpClient} from "@app/services";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {Space} from "@entities/space";

@Component({
  templateUrl: 'customer.page.html',
  standalone: true,
  selector: 'CustomerPage',
  styleUrl: 'customer.page.scss',
  imports: [CustomerToolbar, MenuDrawer, MenuDrawerItem, LucideAngularModule, Button,
    RouterOutlet,  RouterLink, RouterLinkActive, NgIf
  ]
})
export class CustomerPage implements OnInit, OnDestroy{

  icon = {
    PlusIcon, UserIcon, FolderIcon, ArchiveIcon, StarIcon
  }

  space: Space
  customerService = inject(CustomerService)
  spaceService = inject(SpaceHttpClient)

  getStatisticsTask = new Task<CustomerStatisticsModel>(async () => {
    this.statistics = await this.customerService.getStatisticsAsync(this.space);
    return this.statistics
  });

  getSpaceTask = new Task(async () => {
    const identifier = this.route.snapshot.params['identifier'];
    this.space = await this.spaceService.getByIdentifierAsync(identifier);
    this.getStatisticsTask.launch();
  });

  statistics: CustomerStatisticsModel;

  private archiveAddSubscription: Subscription;
  private archiveRemoveSubscription: Subscription;
  private favoriteAddSubscription: Subscription;
  private favoriteRemoveSubscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getSpaceTask.launch()

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
    this.archiveAddSubscription.unsubscribe();
    this.archiveRemoveSubscription.unsubscribe();
    this.favoriteAddSubscription.unsubscribe();
    this.favoriteRemoveSubscription.unsubscribe();
  }
}
