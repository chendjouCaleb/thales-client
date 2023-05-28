import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {
  CustomerChangeAddressFormModel,
  CustomerChangeInfoFormModel,
  CustomerChangeJobFormModel
} from "../../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-change-address.html'
})
export class CustomerChangeAddress {
  private readonly customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeAddress>,
              private _service: CustomerService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
    this.formGroup =  new FormGroup({
      country: new FormControl(this.customer.country),
      region: new FormControl(this.customer.region),
      city: new FormControl(this.customer.city),
      district: new FormControl(this.customer.district),
      address: new FormControl(this.customer.address)
    })
  }

  async changeInfo() {
    const model = new CustomerChangeAddressFormModel();
    model.country   = this.formGroup.value.country;
    model.region    = this.formGroup.value.region;
    model.city      = this.formGroup.value.city;
    model.district  = this.formGroup.value.district;
    model.address   = this.formGroup.value.address;

    await this._service.changeAddress(this.customer, model);
    this._snackbar.open("Informations d'adresse du client changées.");
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
