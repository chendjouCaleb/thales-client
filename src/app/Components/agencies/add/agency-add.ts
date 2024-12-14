import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AgencyAddModel} from "@app/models";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Agency} from "@entities/agency";
import {Space} from "@entities/space";
import {Button} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";

@Component({
  templateUrl: 'agency-add.html',
  selector: 'AgencyAdd',
  imports: [
    ReactiveFormsModule,
    Button,
    TextField,
    TextFieldLabel,
    TextFieldInput,
    CleaveModule
  ],
  standalone: true
})
export class AgencyAdd {
  formGroup = new FormGroup({
    name: new FormControl<string>(''),
    address: new FormControl<string>(''),
    postalCode: new FormControl<string>(''),
    phoneNumber1: new FormControl<string>(''),
    phoneNumber2: new FormControl<string>(''),
  });

  space: Space

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<Agency, AgencyAdd>,
              private _service: AgencyHttpClient,
              private _snackbar: MatSnackBar) {
    this.space = data.space;
    if(!this.space) {
      throw new Error('Space should not be null!');
    }
  }

  async add() {
    const model = new AgencyAddModel();
    model.name = this.formGroup.value.name;
    model.address = this.formGroup.value.address;
    model.phoneNumber1 = this.formGroup.value.phoneNumber1;
    model.phoneNumber2 = this.formGroup.value.phoneNumber2;
    model.postalCode = this.formGroup.value.postalCode;

    const agency = await this._service.addAsync(this.space, model);
    this.dialogRef.close(agency);
    this._snackbar.open(`L'agence a été ajoutée.`, '', {duration: 5000})
  }
}
