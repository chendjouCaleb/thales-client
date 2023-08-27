import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {AgencyAddModel, AgencyChangeInfoModel} from "@app/models";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {Agency} from "@entities/agency";

@Component({
  templateUrl: 'agency-edit.html'
})
export class AgencyEdit {
  agency: Agency = null;

  formGroup: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<AgencyEdit>,
              private _service: AgencyHttpClient,
              private _snackbar: MatSnackBar) {
    this.agency = data.agency;

    this.formGroup = new FormGroup({
      address: new FormControl<string>(this.agency.name),
      postalCode: new FormControl<string>(this.agency.postalCode),
      phoneNumber1: new FormControl<string>(this.agency.phoneNumber1),
      phoneNumber2: new FormControl<string>(this.agency.phoneNumber2),
    })
  }

  async edit() {
    const model = new AgencyChangeInfoModel();
    model.address = this.formGroup.value.address;
    model.phoneNumber1 = this.formGroup.value.phoneNumber1;
    model.phoneNumber2 = this.formGroup.value.phoneNumber2;
    model.postalCode = this.formGroup.value.postalCode;

    await this._service.changeInfoAsync(this.agency, model);

    this.agency.address = model.address
    this.agency.phoneNumber1 = model.phoneNumber1
    this.agency.phoneNumber2 = model.phoneNumber2
    this.agency.postalCode = model.postalCode

    this._dialogRef.close();
    this._snackbar.open(`L'agence a été modifiée.`, '', {duration: 5000})
  }
}
