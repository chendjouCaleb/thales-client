import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {CleaveModule} from "@app/cleave";

@Component({
  templateUrl: 'procedure-step-change-price.html',
  selector: 'ProcedureStepChangePrice',
  imports: [
    TextField,
    TextFieldLabel,
    ReactiveFormsModule,
    TextFieldInput,
    Button,
    CleaveModule
  ],
  standalone: true
})
export class ProcedureStepChangePrice {
  procedureStep: ProcedureStep;

  formControl: FormControl<number>

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<number, ProcedureStepChangePrice>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl(this.procedureStep.price.amount);
  }

  async changePrice() {
    const price = this.formControl.value;

    await this._service.changeStepPriceAsync(this.procedureStep, price);
    this.dialogRef.close(price);
    this._snackbar.open(`Le prix a été changé.`, '', {duration: 3000})
  }
}
