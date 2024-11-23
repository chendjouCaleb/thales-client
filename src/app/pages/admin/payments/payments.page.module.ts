import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {PaymentsListPage} from "./list/payments-list.page";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {PaymentModule} from "../../../Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";

const routes: Routes = [
  {path: 'list', component: PaymentsListPage },
  {path: '', component: PaymentsListPage },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatMenuModule, MatButtonModule, MatTableModule,
    MatDialogModule, MatIconModule, PaymentModule, PaymentsList],
  declarations: [ PaymentsListPage ]
})
export class PaymentsPageModule {

}
