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
import {BreadcrumbModule, CustomerPickerModule, ProcedureApplyModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {AgencyProcedureAppliesListPage} from "./list/agency-procedure-applies-list.page";
import {ProcedureApplyHomePage} from "./home/procedure-apply-home.page";
import {ProcedureApplyStepHomePage} from "./step-home/procedure-apply-step-home.page";
import {PaymentModule} from "@app/Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";

const routes: Routes = [
  {path: '', component: AgencyProcedureAppliesListPage},
  {path: ':procedureApplyId', component: ProcedureApplyHomePage},
  {path: ':procedureApplyId/steps/:procedureApplyStepId', component: ProcedureApplyStepHomePage}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule,
        ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule,
        CustomerPickerModule, ProcedureApplyModule, MatProgressSpinnerModule, CleaveModule, PaymentModule, BreadcrumbModule, PaymentsList, ProcedureApplyList],
  declarations: [AgencyProcedureAppliesListPage, ProcedureApplyHomePage, ProcedureApplyStepHomePage]
})
export class AgencyProcedureApplyPageModule {

}
