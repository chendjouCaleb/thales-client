import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'agency-change-name.html',
  selector: 'AgencyChangeName',
  imports: [
    TextField,
    TextFieldInput,
    ReactiveFormsModule,
    TextFieldLabel,
    Button
  ],
  standalone: true
})
export class AgencyChangeName {
  agency: Agency;

  formControl: FormControl<string>

  constructor(@Inject(DIALOG_DATA) data: any,
              public readonly _dialogRef: DialogRef<string, AgencyChangeName>,
              private _httpClient: AgencyHttpClient,
              private _snackbar: MatSnackBar) {
    this.agency = data.agency;
    this.formControl = new FormControl<string>(this.agency.name);
  }

  async changeName() {
    const name = this.formControl.value;

    await this._httpClient.changeNameAsync(this.agency, name);
    this.agency.name = name;
    this._dialogRef.close(name);
    this._snackbar.open(`Le nom de l'agence a été changé.`, '', {duration: 3000})
  }
}
