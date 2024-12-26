import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtChangeAmount} from "@app/Components/debts/amount/debt-change-amount";


@Injectable()
export class DebtChangeAmountLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(debt: Debt): Observable<any> {
    const dialogRef = this._dialog.open(DebtChangeAmount, {data: {debt}});
    return dialogRef.closed;
  }
}
