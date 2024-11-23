import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomerPage} from "./customer.page";
import {CustomerListPage} from "./list/customer-list.page";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {PaymentModule} from "../../../Components/payments";
import {PlaneTicketModule} from "../../../Components/plane-tickets";
import {ProcedureApplyModule} from "@app/Components";
import {CleaveModule} from "@app/cleave";
import {TraceModule} from "@app/trace";
import {CustomerList } from "@app/Components/customers";
import {MatSelectModule} from "@angular/material/select";

const routes: Routes = [
  {
    path: '', component: CustomerPage, children: [
      {path: 'list', component: CustomerListPage},
      {path: '', redirectTo: 'list', pathMatch: 'full'}
    ]
  }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MatButtonModule, MatIconModule,
        MatInputModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule,
        MatStepperModule, ReactiveFormsModule, MatDatepickerModule, MatTableModule, MatTabsModule, PaymentModule,
      PlaneTicketModule,
        ProcedureApplyModule, CleaveModule, TraceModule,  CustomerList],

  declarations: [
    CustomerPage, CustomerListPage
  ]
})
export class CustomerPageModule {

}
