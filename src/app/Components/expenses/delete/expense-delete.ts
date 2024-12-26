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
  templateUrl: 'expense-delete.html',
  selector: 'IncomeDelete',
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
  standalone: true
})
export class ExpenseDelete {
  icons = { ChevronDownIcon }
  expense: Expense

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, ExpenseDelete>,
              private _service: ExpenseService,
              private _snackbar: MatSnackBar) {
    this.expense = data.expense;
  }



  async delete() {
    await this.deleteTask.launch()
    if(this.deleteTask.success) {
      this.deleteTask.result;
      this._dialogRef.close();
      this._snackbar.open(`La dépense a été supprimée.`, '', { duration: 3000 });
    }
  }

  deleteTask = new Task(async () => {
    await this._service.deleteAsync(this.expense)
  })
}

