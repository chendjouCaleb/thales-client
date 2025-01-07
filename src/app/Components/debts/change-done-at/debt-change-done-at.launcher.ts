import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtChangeReason} from "@app/Components/debts/change-reason/debt-change-reason";
import {DebtChangeDueAt} from "@app/Components/debts/change-due-at/debt-change-due-at";
import {DebtChangeDoneAt} from "@app/Components/debts/change-done-at/debt-change-done-at";


@Injectable()
export class DebtChangeDoneAtLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(debt: Debt): Observable<any> {
    const dialogRef = this._dialog.open(DebtChangeDoneAt, {data: {debt}});
    return dialogRef.closed;
  }
}
