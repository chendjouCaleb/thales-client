import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {CustomerChangeInfoFormModel, CustomerChangeJobFormModel} from "../../../../models";

@Component({
  templateUrl: 'customer-change-job.html'
})
export class CustomerChangeJob {
  private readonly customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeJob>,
              private _service: CustomerService) {
    this.customer = data.customer;
    this.formGroup = new FormGroup({
      jobTitle: new FormControl(this.customer.jobTitle)
    })
  }

  async changeInfo() {
    const model = new CustomerChangeJobFormModel()
    model.jobTitle = this.formGroup.value.jobTitle;

    await this._service.changeJob(this.customer, model)
  }

  close() {
    this._dialogRef.close()
  }
}
