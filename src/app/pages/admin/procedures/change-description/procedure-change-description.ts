import {Component, Inject} from "@angular/core";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "@entities/procedure";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-change-description.html',
  selector: 'ProcedureChangeDescription',
  imports: [
    TextField,
    ReactiveFormsModule,
    TextFieldInput,
    Button
  ],
  standalone: true
})
export class ProcedureChangeDescription {
  procedure: Procedure;

  formControl: FormControl<string>

  constructor(@Inject(DIALOG_DATA) data:any
    ,
              public _dialogRef: DialogRef<string, ProcedureChangeDescription>,
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
    this._snackbar.open(`La description de la procédure a été changée.`, '', {duration: 3000})
  }
}
