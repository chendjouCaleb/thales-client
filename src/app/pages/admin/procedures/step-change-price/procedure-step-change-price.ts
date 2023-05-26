import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-step-change-name.html'
})
export class ProcedureStepChangeName {
  procedureStep: ProcedureStep;

  formControl: FormControl<string>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureStepChangeName>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl<string>(this.procedureStep.name);
  }

  async changeName() {
    const name = this.formControl.value;

    await this._service.changeStepNameAsync(this.procedureStep, name);
    this.procedureStep.name = name;
    this._dialogRef.close(name);
    this._snackbar.open(`Le nom de l'état procédure a été changé.`, '', {duration: 5000})
  }
}
