import {Component, Inject} from "@angular/core";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "@entities/procedure";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-delete.html',
  selector: 'ProcedureDelete',
  imports: [
    Button
  ],
  standalone: true
})
export class ProcedureDelete {
  procedure: Procedure;

  constructor(@Inject(DIALOG_DATA) data:any,
              public _dialogRef: DialogRef<boolean, ProcedureDelete>,
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
