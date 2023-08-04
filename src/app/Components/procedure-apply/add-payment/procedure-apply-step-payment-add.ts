import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureApplyStep} from "@entities/index";
import {FormControl} from "@angular/forms";

@Component({
  templateUrl: 'procedure-apply-step-payment-add.html'
})
export class ProcedureApplyStepPaymentAdd {
  applyStep: ProcedureApplyStep;

  formControl = new FormControl<number>(null);

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureApplyStepPaymentAdd>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.applyStep = data.applyStep;
  }

  async addPayment() {
    const amount = this.formControl.value;
    const payment = await this._service.addPaymentAsync(this.applyStep, amount);

    this._dialogRef.close(payment);
    this._snackbar.open(`Le paiement a été ajouté.`, '', {duration: 5000})
  }
}
