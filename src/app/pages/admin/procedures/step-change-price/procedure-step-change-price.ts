import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'procedure-step-change-price.html'
})
export class ProcedureStepChangePrice {
  procedureStep: ProcedureStep;

  formControl: FormControl<number>

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProcedureStepChangePrice>,
              private _service: ProcedureService,
              private _snackbar: MatSnackBar) {
    this.procedureStep = data.procedure;
    this.formControl = new FormControl(this.procedureStep.price);
  }

  async changePrice() {
    const price = this.formControl.value;

    await this._service.changeStepPriceAsync(this.procedureStep, price);
    this._dialogRef.close(price);
    this._snackbar.open(`Le prix a été changé.`, '', {duration: 5000})
  }
}
