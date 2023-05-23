import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {CustomerChangeInfoFormModel} from "../../../../models";

@Component({
  templateUrl: 'customer-change-info.html'
})
export class CustomerChangeInfo {
  private customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeInfo>,
              private _service: CustomerService) {
    this.customer = data.customer;
    this.formGroup = customerInfoForm(this.customer)
  }

  async changeInfo() {
    const model = new CustomerChangeInfoFormModel();
    model.firstName = this.formGroup.value.firstName
    model.lastName = this.formGroup.value.lastName
    model.birthDate = this.formGroup.value.birthDate
    model.sex = this.formGroup.value.sex

    await this._service.changeInfoAsync(this.customer, model)
  }

  close() {
    this._dialogRef.close()
  }
}
