import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Expense} from "@entities/expense";
import {ExpenseAdd} from "@app/Components/expenses/add/expense-add";

export class ExpenseAddLauncher {
  constructor(private _dialog: Dialog) {
  }

  addExpense(space: Space, customer: Customer): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(ExpenseAdd, {data: {customer, space}});
    return dialogRef.closed;
  }
}
