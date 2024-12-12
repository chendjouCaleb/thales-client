import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureStep} from "@entities/procedure";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-step-change-description.html',
  selector: 'ProcedureStepChangeDescription',
  imports: [
    TextField,
    TextFieldLabel,
    TextFieldInput,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class ProcedureStepChangeDescription {
  procedureStep: ProcedureStep;

  formControl: FormControl<string>

  constructor(@Inject(DIALOG_DATA) data: any,
              public readonly dialogRef: DialogRef<string, ProcedureStepChangeDescription>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl<string>(this.procedureStep.description);
  }

  async changeDescription() {
    const description = this.formControl.value;

    await this._service.changeStepDescriptionAsync(this.procedureStep, description);
    this.procedureStep.description = description;
    this.dialogRef.close(description);
    this._snackbar.open(`La description de l'étape procédure a été changée.`, '', {duration: 3000})
  }
}
