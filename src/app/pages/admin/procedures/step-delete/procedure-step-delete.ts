import {Component, Inject} from "@angular/core";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-step-delete.html',
  selector: 'ProcedureStepDelete',
  imports: [
    Button
  ],
  standalone: true
})
export class ProcedureStepDelete {
  procedureStep: ProcedureStep;

  constructor(@Inject(DIALOG_DATA) data:any,
              public _dialogRef: DialogRef<boolean, ProcedureStepDelete>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedureStep;
  }

  async delete() {
    await this._service.deleteStepAsync(this.procedureStep)
    this._dialogRef.close(true);
    this._snackbar.open(`L'étape a été supprimée de la procédure.`, '', {duration: 5000})
  }
}
