import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProcedureApplyController} from "./procedure-apply.controller";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ProcedureApplyStepValidate} from "./validate/procedure-apply-step-validate";
import {CleaveModule} from "@app/cleave";
import {ProcedureApplyStepPaymentAdd} from "./add-payment/procedure-apply-step-payment-add";
import {Button} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule,
    FormsModule, RouterModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule, MatInputModule, ReactiveFormsModule, CleaveModule, Button, TextField, TextFieldLabel, TextFieldInput],
  declarations: [
  ProcedureApplyStepValidate, ProcedureApplyStepPaymentAdd ],
  providers: [ ProcedureApplyController ]
})
export class ProcedureApplyModule { }
