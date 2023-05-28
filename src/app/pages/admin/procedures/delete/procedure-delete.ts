import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-delete.html'
})
export class ProcedureDelete {
  procedure: Procedure;

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureDelete>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedure = data.procedure;
  }

  async delete() {
    await this._service.deleteAsync(this.procedure)
    this._dialogRef.close(true);
    this._snackbar.open(`La procédure a été supprimée.`, '', {duration: 5000})
  }
}
