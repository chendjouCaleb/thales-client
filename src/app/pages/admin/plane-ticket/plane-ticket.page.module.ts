import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {PlaneTicketListPage} from "./list/plane-ticket-list.page";
import {PlaneTicketModule} from "@app/Components";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";

const routes: Routes = [
  {path: '', component: PlaneTicketListPage}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), PlaneTicketModule, PlaneTicketList],
  declarations: [PlaneTicketListPage]
})
export class PlaneTicketPageModule {

}
