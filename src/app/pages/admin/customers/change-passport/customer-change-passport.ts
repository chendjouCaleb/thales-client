import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {
  CustomerChangeInfoFormModel,
  CustomerChangeJobFormModel,
  CustomerChangePassportFormModel
} from "../../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-change-passport.html'
})
export class CustomerChangePassport {
  private readonly customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangePassport>,
              private _snackbar: MatSnackBar,
              private _service: CustomerService) {
    this.customer = data.customer;
    this.formGroup = new FormGroup({
      hasPassport: new FormControl(this.customer.hasPassport ? 'y': 'n')
    })
  }

  async changeInfo() {
    const model = new CustomerChangePassportFormModel();
    model.hasPassport = this.formGroup.value.hasPassport == 'y';

    await this._service.changePassport(this.customer, model);
    this._snackbar.open("Informations mises à jour.", '', {duration: 5000});
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
