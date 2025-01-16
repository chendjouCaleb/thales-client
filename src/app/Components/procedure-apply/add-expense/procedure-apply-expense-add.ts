import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CustomerPickerDialog} from "@app/Components";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ExpenseAddModel} from "@app/models";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApplyStep} from "@entities/procedure-apply";
import {Expense} from "@entities/finance";

@Component({
  templateUrl: 'procedure-apply-expense-add.html',
  selector: 'ProcedureApplyExpenseAdd',
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
export class ProcedureApplyExpenseAdd {
  icons = { ChevronDownIcon }
  procedureApplyStep: ProcedureApplyStep;

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    reason: new FormControl<string>(''),
    details: new FormControl<string>(''),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Expense, ProcedureApplyExpenseAdd>,
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
      const expense = this.addTask.result;
      this._dialogRef.close(expense);
      this._snackbar.open(`La dépense a été ajoutée.`, '', {duration: 3000});
    }
  }

  addTask = new Task(async () => {
    const model = new ExpenseAddModel(this.formGroup.value);
    return await this._service.addExpenseAsync(this.procedureApplyStep, model);
  });

}

