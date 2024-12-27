import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CustomerPickerDialog} from "@app/Components";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Expense} from "@entities/finance/expense";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ExpenseService} from "@app/services/expense.service";

@Component({
  templateUrl: 'income-change-details.html',
  selector: 'IncomeChangeDetails',
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
export class IncomeChangeDetails {
  icons = { ChevronDownIcon }
  expense: Expense

  control = new FormControl<string>('')

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<string, IncomeChangeDetails>,
              private _service: ExpenseService,
              private _snackbar: MatSnackBar) {
    this.expense = data.expense;
    this.control = new FormControl(this.expense.details)
  }



  async change() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const details = this.addTask.result;
      this._dialogRef.close(details);
      this._snackbar.open(`Les détails du paiement ont été changés.`, '', {duration: 3000});
    }
  }

  addTask = new Task<string>(async () => {
    const details = this.control.value;
    await this._service.changeDetailsAsync(this.expense, details);
    return details;
  })
}

