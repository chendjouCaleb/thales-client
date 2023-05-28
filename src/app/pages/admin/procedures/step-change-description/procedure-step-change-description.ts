import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-step-change-description.html'
})
export class ProcedureStepChangeDescription {
  procedureStep: ProcedureStep;

  formControl: FormControl<string>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureStepChangeDescription>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl<string>(this.procedureStep.description);
  }

  async changeDescription() {
    const description = this.formControl.value;

    await this._service.changeStepDescriptionAsync(this.procedureStep, description);
    this.procedureStep.description = description;
    this._dialogRef.close(description);
    this._snackbar.open(`La description de l'étape procédure a été changée.`, '', {duration: 5000})
  }
}
