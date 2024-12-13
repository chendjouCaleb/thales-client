import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {BreadcrumbModule } from "@app/Components";
import {PlaneTicketAdd} from "@app/Components/plane-tickets/add/plane-ticket-add";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PlaneTicketEdit} from "@app/Components/plane-tickets/edit/plane-ticket-edit";
import {PaymentModule} from "@app/Components";
import {CleaveModule} from "@app/cleave";
import {AgencyPlaneTicketListPage} from "./list/agency-plane-ticket-list.page";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AgencyPlaneTicketPage} from "@app/pages/agency/plane-ticket/agency-plane-ticket.page";

const routes: Routes = [
  {path: 'add', component: PlaneTicketAdd },
  {path: ':planeTicketId', component: AgencyPlaneTicketPage },
  {path: ':planeTicketId/edit', component: PlaneTicketEdit },
  {path: '', component: AgencyPlaneTicketListPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, ReactiveFormsModule,
    MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule, MatRadioModule, MatCheckboxModule,
     PaymentModule, CleaveModule, BreadcrumbModule, PaymentsList, PlaneTicketList, MatProgressSpinner],
  declarations: []
})
export class AgencyPlaneTicketPageModule {

}
