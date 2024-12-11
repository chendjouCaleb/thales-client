import {Component, Inject} from "@angular/core";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureStep} from "@entities/procedure";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-step-change-name.html',
  selector: 'ProcedureStepChangeName',
  imports: [
    TextField,
    TextFieldLabel,
    TextFieldInput,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class ProcedureStepChangeName {
  procedureStep: ProcedureStep;

  formControl: FormControl<string>

  constructor(@Inject(DIALOG_DATA) data: any
    ,
              public dialogRef: DialogRef<string,ProcedureStepChangeName>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl<string>(this.procedureStep.name);
  }

  async changeName() {
    const name = this.formControl.value;

    await this._service.changeStepNameAsync(this.procedureStep, name);
    this.procedureStep.name = name;
    this.dialogRef.close(name);
    this._snackbar.open(`Le nom de l'étape procédure a été changé.`, '', {duration: 3000})
  }
}
