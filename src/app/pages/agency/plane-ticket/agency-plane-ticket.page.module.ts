import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaneTicketHomePage} from "./home/plane-ticket-home.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {PlaneTicketPaymentAdd} from "./add-payment/plane-ticket-payment-add";
import {BreadcrumbModule, PlaneTicketModule} from "@app/Components";
import {PlaneTicketAddPage} from "./add/plane-ticket-add.page";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CustomerPickerModule} from "@app/Components";
import {PlaneTicketEditPage} from "./edit/plane-ticket-edit.page";
import {PaymentModule} from "@app/Components";
import {CleaveModule} from "@app/cleave";
import {AgencyPlaneTicketListPage} from "./list/agency-plane-ticket-list.page";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AgencyPlaneTicketPage} from "@app/pages/agency/plane-ticket/agency-plane-ticket.page";

const routes: Routes = [
  {path: 'add', component: PlaneTicketAddPage },
  {path: ':planeTicketId', component: AgencyPlaneTicketPage },
  {path: ':planeTicketId/edit', component: PlaneTicketEditPage },
  {path: '', component: AgencyPlaneTicketListPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, ReactiveFormsModule,
    MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule, MatRadioModule, PlaneTicketModule, MatCheckboxModule,
    CustomerPickerModule, PaymentModule, CleaveModule, BreadcrumbModule, PaymentsList, PlaneTicketList, MatProgressSpinner],
  declarations: [ PlaneTicketHomePage, PlaneTicketPaymentAdd, AgencyPlaneTicketListPage, PlaneTicketAddPage,
  PlaneTicketEditPage ]
})
export class AgencyPlaneTicketPageModule {

}
