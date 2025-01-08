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
  templateUrl: 'procedure-apply-step-invalidate.html',
  selector: 'ProcedureApplyStepInvalidate',
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
export class ProcedureApplyStepInvalidate {
  applyStep: ProcedureApplyStep;

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, ProcedureApplyStepInvalidate>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.applyStep = data.applyStep;
  }

  async invalidate() {
    await this._service.invalidateStepAsync(this.applyStep);

    this._dialogRef.close();
    this._snackbar.open(`La validation de l'étape a été annulée.`, '', {duration: 3000})
  }
}
