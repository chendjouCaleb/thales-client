import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {Breadcrumb} from "./breadcrumb";

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ Breadcrumb ],
  exports: [ Breadcrumb ]
})
export class BreadcrumbModule {

}
