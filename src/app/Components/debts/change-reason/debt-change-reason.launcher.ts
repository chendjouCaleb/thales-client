import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtChangeReason} from "@app/Components/debts/change-reason/debt-change-reason";


@Injectable()
export class DebtChangeReasonLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(debt: Debt): Observable<any> {
    const dialogRef = this._dialog.open(DebtChangeReason, {data: {debt}});
    return dialogRef.closed;
  }
}
