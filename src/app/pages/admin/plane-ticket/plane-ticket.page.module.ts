import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {PlaneTicketListPage} from "./list/plane-ticket-list.page";
import {PlaneTicketModule} from "@app/Components";

const routes: Routes = [
  {path: '', component: PlaneTicketListPage}
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), PlaneTicketModule],
  declarations: [PlaneTicketListPage]
})
export class PlaneTicketPageModule {

}
