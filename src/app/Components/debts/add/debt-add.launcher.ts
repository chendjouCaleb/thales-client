import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Debt} from "@entities/finance/debt";
import {DebtAdd} from "@app/Components/debts/add/debt-add";
import {Injectable} from "@angular/core";
import {Agency} from "@entities/agency";


@Injectable()
export class DebtAddLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(space: Space, agency?: Agency,
             customer?: Customer): Observable<Debt> {
    const dialogRef = this._dialog.open<Debt>(DebtAdd, {data: {customer, agency, space}});
    return dialogRef.closed;
  }
}
