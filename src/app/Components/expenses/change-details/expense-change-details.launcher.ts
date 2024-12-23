import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Expense} from "@entities/expense";
import {ExpenseAdd} from "@app/Components/expenses/add/expense-add";
import {Injectable} from "@angular/core";
import {Agency} from "@entities/agency";
import {ExpenseChangeAmount} from "@app/Components/expenses/amount/expense-change-amount";
import {ExpenseChangeDetails} from "@app/Components/expenses/change-details/expense-change-details";


@Injectable()
export class ExpenseChangeDetailsLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(expense: Expense): Observable<any> {
    const dialogRef = this._dialog.open(ExpenseChangeDetails, {data: {expense}});
    return dialogRef.closed;
  }
}
