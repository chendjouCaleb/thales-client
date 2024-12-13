import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'payment-delete.html',
  selector: 'PaymentDelete',
  imports: [
    Button
  ],
  standalone: true
})
export class PaymentDelete {
  payment: Payment

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<boolean, PaymentDelete>,
              private _service: PaymentService,
              private _snackbar: MatSnackBar) {
    this.payment = data.payment;

  }

  async delete() {
    await this._service.deleteAsync(this.payment);
    this._dialogRef.close(true);
    this._snackbar.open(`Le paiement a été supprimé.`, '', {duration: 3000})
  }
}
