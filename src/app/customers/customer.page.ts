import {Component} from "@angular/core";
import {CustomerToolbar} from "@app/customers/toolbar/customer-toolbar";
import {MenuDrawer, MenuDrawerItem} from "@app/ui";
import {LucideAngularModule, PlusIcon, UserIcon, FolderIcon, ArchiveIcon, SettingsIcon, StarIcon} from "lucide-angular";
import {Button} from "@app/ui/button/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CustomerListModule} from "@app/Components/customers";

@Component({
  templateUrl: 'customer.page.html',
  standalone: true,
  selector: 'CustomerPage',
  styleUrl: 'customer.page.scss',
  imports: [CustomerToolbar, MenuDrawer, MenuDrawerItem, LucideAngularModule, Button,
    RouterOutlet, CustomerListModule, RouterLink, RouterLinkActive
  ]
})
export class CustomerPage {
  icon = {
    PlusIcon, UserIcon, FolderIcon, ArchiveIcon, StarIcon
  }
  protected readonly settingsIcon = SettingsIcon;

  allCustomerCount: number = 0;
  archivedCustomerCount: number = 0;
  favoriteCustomerCount: number = 0;
}
