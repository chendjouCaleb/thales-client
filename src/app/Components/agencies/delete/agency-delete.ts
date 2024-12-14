import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Agency} from "@entities/agency";
import {AgencyService} from "@app/Components";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'agency-delete.html',
  selector: 'AgencyDelete',
  imports: [
    Button
  ],
  standalone: true
})
export class AgencyDelete {
  agency: Agency

  constructor(@Inject(DIALOG_DATA) data,
              public _dialogRef: DialogRef<boolean, AgencyDelete>,
              private _service: AgencyService,
              private _snackbar: MatSnackBar) {
    this.agency = data.agency;

  }

  async delete() {
    await this._service.deleteAgency(this.agency);
    this._dialogRef.close(true);
    this._snackbar.open(`L'agence a été supprimée.`, '', {duration: 3000})
  }
}
