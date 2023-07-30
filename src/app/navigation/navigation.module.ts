import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavHost} from "./nav-host";
import {NavRouteDef} from "./route";

@NgModule({
  imports: [CommonModule],
  declarations: [ NavHost, NavRouteDef ],
  exports: [NavRouteDef, NavRouteDef, NavHost]
})
export class NavigationModule {

}
