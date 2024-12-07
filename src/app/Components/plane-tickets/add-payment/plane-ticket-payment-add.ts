import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {PlaneTicketService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlaneTicket} from "@entities/index";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {CleaveModule} from "@app/cleave";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  templateUrl: 'plane-ticket-payment-add.html',
  selector: 'PlaneTicketPaymentAdd',
  imports: [
    MatFormField,
    CleaveModule,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatDialogClose
  ],
  standalone: true
})
export class PlaneTicketPaymentAdd {
  planeTicket: PlaneTicket;

  formControl = new FormControl<number>(null);

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<PlaneTicketPaymentAdd>,
              private _service: PlaneTicketService,
              private _snackbar: MatSnackBar) {
    this.planeTicket = data.planeTicket;
  }

  async addPayment() {
    const amount = this.formControl.value;
    const payment = await this._service.addPaymentAsync(this.planeTicket, amount);

    this._dialogRef.close(payment);
    this._snackbar.open(`Le paiement a été ajouté.`, '', {duration: 5000})
  }
}
