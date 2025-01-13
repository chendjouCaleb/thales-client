import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Payment, ProcedureApplyStep} from "@entities/index";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {Money} from "@entities/money";

@Component({
  templateUrl: 'procedure-apply-step-change-price.html',
  selector: 'ProcedureApplyStepChangePrice',
  imports: [
    TextFieldLabel,
    CleaveModule,
    TextField,
    TextFieldInput,
    ReactiveFormsModule,
    Button
  ],
  standalone: true
})
export class ProcedureApplyStepChangePrice {
  procedureApplyStep: ProcedureApplyStep;

  formControl = new FormControl<number>(null);

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<void, ProcedureApplyStepChangePrice>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.procedureApplyStep = data.procedureApplyStep;
  }

  async changeAmount() {
    const amount = Money.of(this.formControl.value);
    await this._service.changePriceAsync(this.procedureApplyStep, amount);

    this.dialogRef.close();
    this._snackbar.open(`Le prix de l'étape a été changé.`, '', {duration: 5000})
  }
}
