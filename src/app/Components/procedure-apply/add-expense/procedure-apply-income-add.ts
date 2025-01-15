import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "@entities/customer";
import {CustomerPickerDialog} from "@app/Components";
import {Agency} from "@entities/agency";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Income} from "@entities/finance/income";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IncomeAddModel} from "@app/models";
import {Space} from "@entities/space";
import {IncomeService} from "@app/services/income.service";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApplyStep} from "@entities/procedure-apply";

@Component({
  templateUrl: 'procedure-apply-income-add.html',
  selector: 'PlaneTicketExpenseAdd',
  imports: [
    LucideAngularModule,
    TextField,
    CleaveModule,
    TextFieldInput,
    ReactiveFormsModule,
    Button,
    NgIf,
    MatProgressSpinner
  ],
  standalone: true,
  providers: [ CustomerPickerDialog ]
})
export class ProcedureApplyIncomeAdd {
  icons = { ChevronDownIcon }
  procedureApplyStep: ProcedureApplyStep;

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    reason: new FormControl<string>(this.getDefaultReason()),
    details: new FormControl<string>(''),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Income, ProcedureApplyIncomeAdd>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.procedureApplyStep = data.procedureApplyStep;

    if(!this.procedureApplyStep) {
      throw new Error('this.procedureApplyStep should not be null')
    }
  }


  async add() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const income = this.addTask.result;
      this._dialogRef.close(income);
      this._snackbar.open(`La revenue a été ajouté.`, '', {duration: 3000});
    }
  }

  addTask = new Task(async () => {
    const model = new IncomeAddModel(this.formGroup.value);
    return await this._service.addIncomeAsync(this.procedureApplyStep, model);
  })

  getDefaultReason() {
    return `Paiement pour ${this.procedureApplyStep.name} de la procédure n° ${this.procedureApplyStep?.procedureApply?.code}.`
  }
}

