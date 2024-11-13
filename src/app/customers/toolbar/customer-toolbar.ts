import {Component, ViewEncapsulation} from "@angular/core";
import {LucideAngularModule, SearchIcon, SettingsIcon} from "lucide-angular";

@Component({
  templateUrl: 'customer-toolbar.html',
  styleUrl: 'customer-toolbar.scss',
  selector: 'CustomerToolbar',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [LucideAngularModule],
  host: {
    class: 'customer-toolbar'
  }
})
export class CustomerToolbar {
  searchIcon = SearchIcon
  settingsIcon = SettingsIcon
}
