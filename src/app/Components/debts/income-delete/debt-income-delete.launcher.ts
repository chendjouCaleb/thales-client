import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtDelete} from "@app/Components/debts/delete/debt-delete";
import {DebtIncomeDelete} from "@app/Components/debts/income-delete/debt-income-delete";
import {DebtIncome} from "@entities/finance/debt-income";


@Injectable()
export class DebtIncomeDeleteLauncher {
  constructor(private _dialog: Dialog) {}

  launch(debtIncome: DebtIncome): Observable<any> {
    const dialogRef = this._dialog.open(DebtIncomeDelete, {data: {debtIncome}});
    return dialogRef.closed;
  }
}
