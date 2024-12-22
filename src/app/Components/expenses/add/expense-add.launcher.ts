import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Expense} from "@entities/expense";
import {ExpenseAdd} from "@app/Components/expenses/add/expense-add";
import {Injectable} from "@angular/core";
import {Agency} from "@entities/agency";


@Injectable()
export class ExpenseAddLauncher {
  constructor(private _dialog: Dialog) {
  }

  addExpense(space: Space, agency?: Agency,
             customer?: Customer): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(ExpenseAdd, {data: {customer, agency, space}});
    return dialogRef.closed;
  }
}
