import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Nav} from "./nav";
import {NavItem} from "./item/nav-item";
import {NavItemIcon} from "./item/nav-item-icon";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ Nav, NavItem, NavItemIcon ],
  exports: [ Nav, NavItem, NavItemIcon ]
})
export class NavModule {

}
