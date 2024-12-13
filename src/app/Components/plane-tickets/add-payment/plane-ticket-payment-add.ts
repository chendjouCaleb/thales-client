import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {PlaneTicketService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment, PlaneTicket} from "@entities/index";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {CleaveModule} from "@app/cleave";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

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
    MatDialogClose,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button
  ],
  standalone: true
})
export class PlaneTicketPaymentAdd {
  planeTicket: PlaneTicket;

  formControl = new FormControl<number>(null);

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Payment, PlaneTicketPaymentAdd>,
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
