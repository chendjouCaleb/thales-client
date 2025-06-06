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
import {ProcedureApplyStepChangePrice} from "@app/Components/procedure-apply/change-price/procedure-apply-step-change-price";
import {Button} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule,
    FormsModule, RouterModule, MatProgressSpinnerModule, MatIconModule, MatDialogModule, MatInputModule, ReactiveFormsModule, CleaveModule, Button, TextField, TextFieldLabel, TextFieldInput],
  declarations: [ ],
  providers: [ ProcedureApplyController ]
})
export class ProcedureApplyModule { }
