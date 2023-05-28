import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../../../entities";
import {customerInfoForm} from "../customer-form";
import {FormControl, FormGroup} from "@angular/forms";
import {CustomerService} from "../../../../services";
import {
  CustomerChangeInfoFormModel,
  CustomerChangeJobFormModel,
  CustomerChangeStudyFormModel
} from "../../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-change-study.html'
})
export class CustomerChangeStudy {
  private readonly customer: Customer;
  public formGroup: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private _dialogRef: MatDialogRef<CustomerChangeStudy>,
              private _snackbar: MatSnackBar,
              private _service: CustomerService) {
    this.customer = data.customer;
    this.formGroup =new FormGroup({
      studyEndYear: new FormControl<number>(this.customer.studyEndYear),
      studyLevel: new FormControl(this.customer.studyLevel)
    });
  }

  async changeInfo() {
    const model = new CustomerChangeStudyFormModel()
    model.studyLevel = this.formGroup.value.studyLevel;
    model.studyEndYear = this.formGroup.value.studyEndYear;
    console.log(model)

    await this._service.changeStudy(this.customer, model);
    this._snackbar.open("Informations mises à jour.", '', {duration: 5000});
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
