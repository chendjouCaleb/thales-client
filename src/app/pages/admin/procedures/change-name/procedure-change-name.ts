import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-change-name.html',
  selector: 'ProcedureChangeName'
})
export class ProcedureChangeName {
  procedure: Procedure;

  formControl: FormControl<string>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureChangeName>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedure = data.procedure;
    this.formControl = new FormControl<string>(this.procedure.name);
  }

  async changeName() {
    const name = this.formControl.value;

    await this._service.changeNameAsync(this.procedure, name);
    this.procedure.name = name;
    this._dialogRef.close(name);
    this._snackbar.open(`Le nom de la procédure a été changé.`, '', {duration: 5000})
  }
}
