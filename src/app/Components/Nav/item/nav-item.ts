import {Component, ViewEncapsulation} from "@angular/core";

@Component({
  templateUrl: 'nav-item.html',
  selector: 'th-nav-item',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'th-nav-item'
  }
})
export class NavItem {

}
