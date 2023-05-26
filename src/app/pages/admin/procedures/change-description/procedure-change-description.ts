import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-change-description.html'
})
export class ProcedureChangeDescription {
  procedure: Procedure;

  formControl: FormControl<string>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureChangeDescription>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedure = data.procedure;
    this.formControl = new FormControl<string>(this.procedure.description);
  }

  async changeDescription() {
    const description = this.formControl.value;

    await this._service.changeDescriptionAsync(this.procedure, description);
    this.procedure.description = description;
    this._dialogRef.close(description);
    this._snackbar.open(`La description de la procédure a été changée.`, '', {duration: 5000})
  }
}
