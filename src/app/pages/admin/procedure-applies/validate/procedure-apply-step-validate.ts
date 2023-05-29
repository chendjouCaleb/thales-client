import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService, ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureApplyStep, ProcedureStep} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";
import {ProcedureApplyStepValidateModel} from "../../../../models";

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
