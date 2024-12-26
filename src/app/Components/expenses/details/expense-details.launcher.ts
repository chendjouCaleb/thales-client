import {Dialog} from "@angular/cdk/dialog";
import {Expense} from "@entities/finance/expense";
import {ExpenseDetails} from "@app/Components/expenses/details/expense-details";
import {Injectable} from "@angular/core";


@Injectable()
export class ExpenseDetailsLauncher {
  constructor(private _dialog: Dialog) {}

  launch(expense:  Expense) {
    const data = { expenseId: expense.id }
    const _dialogRef = this._dialog.open(ExpenseDetails, { data, disableClose: true });
  }
}
