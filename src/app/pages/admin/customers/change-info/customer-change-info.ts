import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {CustomerChangeInfoFormModel} from "../../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DateTime} from "luxon";

@Component({
  templateUrl: 'customer-change-info.html'
})
export class CustomerChangeInfo {
  private customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeInfo>,
              private _service: CustomerService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
    this.formGroup = customerInfoForm(this.customer)
  }

  async changeInfo() {
    const model = new CustomerChangeInfoFormModel();
    model.firstName   = this.formGroup.value.firstName;
    model.lastName    = this.formGroup.value.lastName;
    model.birthDate   = DateTime.fromJSDate(this.formGroup.value.birthDate).toFormat('yyyy-LL-dd')
    model.sex         = this.formGroup.value.sex;

    await this._service.changeInfoAsync(this.customer, model);

   this._dialogRef.close();
   this._snackbar.open("Informations personnelles mise à jour.");
  }

  close() {
    this._dialogRef.close()
  }
}
