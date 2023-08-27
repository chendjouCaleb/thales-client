import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup} from "@angular/forms";
import {AgencyAddModel} from "@app/models";
import {AgencyHttpClient} from "@app/services/agency.http-client";

@Component({
  templateUrl: 'agency-add.html'
})
export class AgencyAdd {
  formGroup = new FormGroup({
    name: new FormControl<string>(''),
    address: new FormControl<string>(''),
    postalCode: new FormControl<string>(''),
    phoneNumber1: new FormControl<string>(''),
    phoneNumber2: new FormControl<string>(''),
  })

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<AgencyAdd>,
              private _service: AgencyHttpClient,
              private _snackbar: MatSnackBar) { }

  async add() {
    const model = new AgencyAddModel();
    model.name = this.formGroup.value.name;
    model.address = this.formGroup.value.address;
    model.phoneNumber1 = this.formGroup.value.phoneNumber1;
    model.phoneNumber2 = this.formGroup.value.phoneNumber2;
    model.postalCode = this.formGroup.value.postalCode;

    const agency = await this._service.addAsync(model);
    this._dialogRef.close(agency);
    this._snackbar.open(`L'agence a été ajoutée.`, '', {duration: 5000})
  }
}
