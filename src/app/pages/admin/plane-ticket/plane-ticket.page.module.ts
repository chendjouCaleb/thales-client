import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PlaneTicketHomePage} from "./home/plane-ticket-home.page";
import {PlaneTicketPage} from "./plane-ticket.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {PlaneTicketPaymentAdd} from "./add-payment/plane-ticket-payment-add";
import {PlaneTicketListPage} from "./list/plane-ticket-list.page";
import {PlaneTicketModule} from "../../../Components/plane-tickets";
import {PlaneTicketAddPage} from "./add/plane-ticket-add.page";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CustomerPickerModule} from "../../../Components";
import {PlaneTicketEditPage} from "./edit/plane-ticket-edit.page";
import {PaymentModule} from "../../../Components/payments";
import {CleaveModule} from "@app/cleave";

const routes: Routes = [
  {path: 'add', component: PlaneTicketAddPage },
  {path: ':planeTicketId', component: PlaneTicketHomePage },
  {path: ':planeTicketId/edit', component: PlaneTicketEditPage },
  {path: '', component: PlaneTicketListPage }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule, ReactiveFormsModule,
        MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule, MatRadioModule, PlaneTicketModule, MatCheckboxModule,
        CustomerPickerModule, PaymentModule, CleaveModule],
  declarations: [ PlaneTicketPage, PlaneTicketHomePage, PlaneTicketPaymentAdd, PlaneTicketListPage, PlaneTicketAddPage,
  PlaneTicketEditPage ]
})
export class PlaneTicketPageModule {

}
