import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {CustomerChangeCultureFormModel, CustomerChangeInfoFormModel} from "../../../../models";
import {LANGUAGES} from "../../../../models/langs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-change-culture.html'
})
export class CustomerChangeCulture {
  private customer: Customer;
  public formGroup: FormGroup;
  languages = LANGUAGES;

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeCulture>,
              private _snackbar: MatSnackBar,
              private _service: CustomerService) {
    this.customer = data.customer;

    this.formGroup = new FormGroup({
      languages: new FormControl(this.customer.languages)
    });
  }

  async changeInfo() {
    const model = new CustomerChangeCultureFormModel()
    model.languages = this.formGroup.value.languages;

    await this._service.changeCulture(this.customer, model);
    this._snackbar.open("Informations mises à jour.", '', {duration: 5000});
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
