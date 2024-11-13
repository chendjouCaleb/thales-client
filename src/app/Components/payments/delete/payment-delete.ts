import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";

@Component({
  templateUrl: 'payment-delete.html',
  selector: 'PaymentDelete'
})
export class PaymentDelete {
  payment: Payment

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<PaymentDelete>,
              private _service: PaymentService,
              private _snackbar: MatSnackBar) {
    this.payment = data.payment;

  }

  async delete() {
    await this._service.deleteAsync(this.payment);
    this._dialogRef.close(true);
    this._snackbar.open(`Le paiement a été supprimé.`, '', {duration: 5000})
  }
}
