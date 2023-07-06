import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProcedureApplyHomePage} from "./home/procedure-apply-home.page";
import {ProcedureApplyPage} from "./procedure-apply.page";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ProcedureApplyStepHomePage} from "./step-home/procedure-apply-step-home.page";
import {MatIconModule} from "@angular/material/icon";
import {ProcedureApplyStepValidate} from "./validate/procedure-apply-step-validate";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {ProcedureApplyStepPaymentAdd} from "./add-payment/procedure-apply-step-payment-add";
import {ProcedureAppliesListPage} from "@app/pages/admin/procedure-applies/list/procedure-applies-list.page";
import {CustomerPickerModule, ProcedureApplyModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  {path: '', component: ProcedureAppliesListPage },
  {path: ':procedureApplyId', component: ProcedureApplyHomePage },
  {path: ':procedureApplyId/steps/:procedureApplyStepId', component: ProcedureApplyStepHomePage }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatIconModule,
    ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatMenuModule,
    CustomerPickerModule, ProcedureApplyModule, MatProgressSpinnerModule],
  exports: [
    ProcedureAppliesListPage
  ],
  declarations: [ProcedureApplyPage, ProcedureApplyHomePage, ProcedureApplyStepHomePage, ProcedureApplyStepValidate,
    ProcedureApplyStepPaymentAdd, ProcedureAppliesListPage]
})
export class ProcedureApplyPageModule {

}
