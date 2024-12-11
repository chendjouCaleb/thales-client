import {Component, Inject} from "@angular/core";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure} from "@entities/procedure";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'procedure-change-name.html',
  selector: 'ProcedureChangeName',
  imports: [
    TextField,
    TextFieldInput,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class ProcedureChangeName {
  procedure: Procedure;

  formControl: FormControl<string>

  constructor(@Inject(DIALOG_DATA) data: any
              ,
              public dialogRef: DialogRef<string, ProcedureChangeName>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedure = data.procedure;
    this.formControl = new FormControl<string>(this.procedure.name);
  }

  async changeName() {
    const name = this.formControl.value;

    await this._service.changeNameAsync(this.procedure, name);
    this.procedure.name = name;
    this.dialogRef.close(name);
    this._snackbar.open(`Le nom de la procédure a été changé.`, '', {duration: 3000})
  }
}
