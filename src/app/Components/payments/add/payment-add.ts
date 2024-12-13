import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "@entities/customer";
import {PaymentService} from "@app/services";
import {PaymentAddFormModel} from "@app/models/forms/payment.form-model";
import {CustomerPickerDialog} from "@app/Components";
import {Agency} from "@entities/agency";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Payment} from "@entities/payment";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'payment-add.html',
  selector: 'PaymentAdd',
  imports: [
    LucideAngularModule,
    TextField,
    CleaveModule,
    TextFieldInput,
    ReactiveFormsModule,
    Button,
    NgIf
  ],
  standalone: true,
  providers: [ CustomerPickerDialog ]
})
export class PaymentAdd {
  icons = { ChevronDownIcon }
  customer: Customer;
  agency: Agency;

  formGroup = new FormGroup({
    customer: new FormControl<number>(null),
    amount: new FormControl<number>(null),
    reason: new FormControl<string>('')
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              private _picker: CustomerPickerDialog,
              public _dialogRef: DialogRef<Payment, PaymentAdd>,

              private _service: PaymentService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
    this.agency = data.agency;
  }

  selectCustomer(event) {
    event?.preventDefault();
    event.stopPropagation();
    this._picker.open().subscribe(customer => {

      if(customer) {
        this.customer = customer;
        this.formGroup.controls.customer.setValue(customer.id)
        console.log(this.formGroup.controls.customer.value)
      }
    })
  }

  async validate() {
    const model = new PaymentAddFormModel(this.formGroup.value);
    const payment = await this._service.addAsync(this.agency, this.customer, model);
    this._dialogRef.close(payment);
    this._snackbar.open(`Le paiement a été ajouté`, '', {duration: 5000});
  }
}
