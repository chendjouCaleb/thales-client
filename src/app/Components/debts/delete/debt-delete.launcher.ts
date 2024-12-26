import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtDelete} from "@app/Components/debts/delete/debt-delete";


@Injectable()
export class DebtDeleteLauncher {
  constructor(private _dialog: Dialog) {}

  launch(debt: Debt): Observable<any> {
    const dialogRef = this._dialog.open(DebtDelete, {data: {debt}});
    return dialogRef.closed;
  }
}
