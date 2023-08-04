import {Component, Input} from "@angular/core";
import {BreadcrumbItem} from "./breadcrumb-item";

@Component({
  selector: 'breadcrumb, [breadcrumb]',
  templateUrl: 'breadcrumb.html'
})
export class Breadcrumb {
  @Input()
  items: BreadcrumbItem[]  = [];
}
