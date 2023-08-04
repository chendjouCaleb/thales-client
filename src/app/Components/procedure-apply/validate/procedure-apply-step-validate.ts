import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureApplyStep} from "@entities/index";
import {FormControl} from "@angular/forms";

@Component({
  templateUrl: 'procedure-apply-step-validate.html'
})
export class ProcedureApplyStepValidate {
  applyStep: ProcedureApplyStep;

  formControl = new FormControl<number>(null);

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureApplyStepValidate>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.applyStep = data.applyStep;
  }

  async validate() {
    const amount = this.formControl.value;
    const model = {paymentAmount: amount}
    const payment = await this._service.validateStepAsync(this.applyStep, model);

    this._dialogRef.close(payment);
    this._snackbar.open(`L'étape a été validée..`, '', {duration: 5000})
  }
}
