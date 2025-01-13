import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment, ProcedureApplyStep} from "@entities/index";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-apply-step-payment-add.html',
  selector: 'ProcedureApplyStepChangePrice',
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
export class ProcedureApplyStepPaymentAdd {
  applyStep: ProcedureApplyStep;

  formControl = new FormControl<number>(null);

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<Payment, ProcedureApplyStepPaymentAdd>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.applyStep = data.applyStep;
  }

  async addPayment() {
    const amount = this.formControl.value;
    const payment = await this._service.addPaymentAsync(this.applyStep, amount);

    this.dialogRef.close(payment);
    this._snackbar.open(`Le paiement a été ajouté.`, '', {duration: 5000})
  }
}
