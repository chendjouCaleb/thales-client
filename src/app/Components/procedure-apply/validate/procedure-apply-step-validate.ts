import {Component, Inject} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment, ProcedureApplyStep} from "@entities/index";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-apply-step-validate.html',
  selector: 'ProcedureApplyStepValidate',
  imports: [
    TextFieldLabel,
    CleaveModule,
    TextField,
    TextFieldInput,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class ProcedureApplyStepValidate {
  applyStep: ProcedureApplyStep;

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, ProcedureApplyStepValidate>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.applyStep = data.applyStep;
  }

  async validate() {
    const payment = await this._service.validateStepAsync(this.applyStep);

    this._dialogRef.close();
    this._snackbar.open(`L'étape a été validée.`, '', {duration: 3000})
  }
}
