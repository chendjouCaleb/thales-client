import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {Customer} from "../../../../entities";
import {PaymentService} from "../../../services";
import {PaymentAddFormModel} from "../../../models/forms/payment.form-model";

@Component({
  templateUrl: 'payment-add.html'
})
export class PaymentAdd {
  customer: Customer;

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    reason: new FormControl<string>('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<PaymentAdd>,
              private _service: PaymentService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;

  }

  async validate() {
    const model = new PaymentAddFormModel(this.formGroup.value);
    const payment = await this._service.addAsync(this.customer, model)
    this._dialogRef.close(payment);
    this._snackbar.open(`Le paiement a été ajouté`, '', {duration: 5000})
  }
}
