import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Debt} from "@entities/finance";
import {DebtIncomeAdd} from "@app/Components/debts/income-add/debt-income-add";
import {DebtIncome} from "@entities/finance/debt-income";


@Injectable()
export class DebtIncomeAddLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(debt: Debt): Observable<DebtIncome> {
    const dialogRef = this._dialog.open<DebtIncome>(DebtIncomeAdd, {data: {debt}});
    return dialogRef.closed;
  }
}
