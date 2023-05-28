import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {CustomerChangeContactFormModel} from "../../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-change-contact.html'
})
export class CustomerChangeContact {
  private readonly customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeContact>,
              private _snackbar: MatSnackBar,
              private _service: CustomerService) {
    this.customer = data.customer;
    this.formGroup = new FormGroup({
      phoneNumber: new FormControl(this.customer.phoneNumber),
      email: new FormControl(this.customer.email)
    })
  }

  async changeInfo() {
    const model = new CustomerChangeContactFormModel();
    model.phoneNumber = this.formGroup.value.phoneNumber;
    model.email = this.formGroup.value.email;

    await this._service.changeContact(this.customer, model);
    this._snackbar.open("Informations de contact mises à jour.");

    this._dialogRef.close()

  }

  close() {
    this._dialogRef.close()
  }
}
