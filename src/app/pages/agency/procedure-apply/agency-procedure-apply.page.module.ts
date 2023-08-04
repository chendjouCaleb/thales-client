import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProcedureApplyHomePage} from "../../agency/procedure-apply/home/procedure-apply-home.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ProcedureApplyStepHomePage} from "../../agency/procedure-apply/step-home/procedure-apply-step-home.page";
import {MatIconModule} from "@angular/material/icon";
import {ProcedureApplyStepValidate} from "@app/Components/procedure-apply/validate/procedure-apply-step-validate";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {ProcedureApplyStepPaymentAdd} from "@app/Components/procedure-apply/add-payment/procedure-apply-step-payment-add";
import {ProcedureAppliesListPage} from "@app/pages/admin/procedure-applies/list/procedure-applies-list.page";
import {CustomerPickerModule, ProcedureApplyModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {
  AgencyProcedureAppliesListPage
} from "@app/pages/agency/procedure-apply/list/agency-procedure-applies-list.page";

const routes: Routes = [
  {path: '', component: AgencyProcedureAppliesListPage },
  {path: ':procedureApplyId', component: ProcedureApplyHomePage },
  {path: ':procedureApplyId/steps/:procedureApplyStepId', component: ProcedureApplyStepHomePage }
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule,
        ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule,
        CustomerPickerModule, ProcedureApplyModule, MatProgressSpinnerModule, CleaveModule],
  exports: [
    ProcedureAppliesListPage
  ],
  declarations: [ AgencyProcedureAppliesListPage, ProcedureApplyHomePage, ProcedureApplyStepHomePage, ProcedureApplyStepValidate,
    ProcedureApplyStepPaymentAdd, ProcedureAppliesListPage]
})
export class AgencyProcedureApplyPageModule {

}
