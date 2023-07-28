import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {Customer, Payment} from "../../../../entities";
import {PaymentService} from "../../../services";
import {PaymentAddFormModel} from "../../../models/forms/payment.form-model";

@Component({
  templateUrl: 'agency-delete.html'
})
export class AgencyDelete {
  payment: Payment

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<AgencyDelete>,
              private _service: PaymentService,
              private _snackbar: MatSnackBar) {
    this.payment = data.payment;

  }

  async delete() {
    await this._service.deleteAsync(this.payment);
    this._dialogRef.close(true);
    this._snackbar.open(`Le paiement a supprimé`, '', {duration: 5000})
  }
}
