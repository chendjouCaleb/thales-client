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
import {CustomerAddPage} from "./add/customer-add.page";
import {MatSelectModule} from "@angular/material/select";
import {CustomerAddAddress} from "./add/address/customer-add-address";
import {CustomerAddContact} from "./add/contact/customer-add-contact";
import {CustomerAddCulture} from "./add/culture/customer-add-culture";
import {CustomerAddJob} from "./add/job/customer-add-job";
import {CustomerAddPassport} from "./add/passport/customer-add-passport";
import {CustomerAddPerson} from "./add/person/customer-add-person";
import {CustomerAddStudy} from "./add/study/customer-add-study";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTableModule} from "@angular/material/table";
import {CustomerHomePage} from "./home/customer-home.page";
import {CustomerChangeInfo} from "./change-info/customer-change-info";
import {CustomerChangeCulture} from "./change-culture/customer-change-culture";
import {CustomerChangeAddress} from "./change-address/customer-change-address";
import {CustomerChangeContact} from "./change-contact/customer-change-contact";
import {CustomerChangePassport} from "./change-passport/customer-change-passport";
import {CustomerChangeStudy} from "./change-study/customer-change-study";
import {CustomerChangeJob} from "./change-job/customer-change-job";
import {CustomerIndexPage} from "./index/customer-index.page";
import {MatTabsModule} from "@angular/material/tabs";
import {PaymentModule} from "../../../Components/payments";
import {CustomerPayments} from "./payments/customer-payments";
import {PlaneTicketModule} from "../../../Components/plane-tickets";
import {ProcedureApplyPageModule} from "@app/pages/admin/procedure-applies/procedure-apply.page.module";
import {ProcedureApplyModule} from "@app/Components";

const routes: Routes = [
  {
    path: '', component: CustomerPage, children: [
      {path: 'list', component: CustomerListPage},
      {path: 'add', component: CustomerAddPage},
      {path: ':customerId/home', redirectTo: ':customerId', pathMatch: 'full'},
      {path: ':customerId', component: CustomerIndexPage},
      {path: '', redirectTo: 'list', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, MatButtonModule, MatIconModule,
    MatInputModule, MatFormFieldModule, MatDialogModule, MatCheckboxModule, MatRadioModule, MatSelectModule,
    MatStepperModule, ReactiveFormsModule, MatDatepickerModule, MatTableModule, MatTabsModule, PaymentModule, PlaneTicketModule,
    ProcedureApplyModule],

  declarations: [
    CustomerPage, CustomerListPage, CustomerAddPage, CustomerAddAddress, CustomerAddContact,
    CustomerAddCulture, CustomerAddJob, CustomerAddPassport, CustomerAddPerson, CustomerAddStudy, CustomerHomePage,
    CustomerChangeInfo, CustomerChangeCulture, CustomerChangeAddress, CustomerChangeContact, CustomerChangePassport,
    CustomerChangeStudy, CustomerChangeJob, CustomerIndexPage, CustomerPayments
  ]
})
export class CustomerPageModule {

}
