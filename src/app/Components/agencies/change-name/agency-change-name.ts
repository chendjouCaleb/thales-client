import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";

@Component({
  templateUrl: 'agency-change-name.html'
})
export class AgencyChangeName {
  agency: Agency;

  formControl: FormControl<string>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<AgencyChangeName>,
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
    this._snackbar.open(`Le nom de l'agence a été changé.`, '', {duration: 5000})
  }
}
