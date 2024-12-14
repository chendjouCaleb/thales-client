import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AgencyAddModel, AgencyChangeInfoModel} from "@app/models";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {Agency} from "@entities/agency";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'agency-edit.html',
  selector: 'AgencyEdit',
  imports: [
    TextField,
    TextFieldLabel,
    TextFieldInput,
    CleaveModule,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class AgencyEdit {
  agency: Agency = null;

  formGroup: FormGroup;

  constructor(@Inject(DIALOG_DATA) data,
              public _dialogRef: DialogRef<AgencyEdit>,
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
    this._snackbar.open(`L'agence a été modifiée.`, '', {duration: 3000})
  }
}
