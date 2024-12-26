import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Income} from "@entities/finance/income";
import {IncomeAdd} from "@app/Components/incomes/add/income-add";
import {Injectable} from "@angular/core";
import {Agency} from "@entities/agency";


@Injectable()
export class IncomeAddLauncher {
  constructor(private _dialog: Dialog) {
  }

  addIncome(space: Space, agency?: Agency,
             customer?: Customer): Observable<Income> {
    const dialogRef = this._dialog.open<Income>(IncomeAdd, {data: {customer, agency, space}});
    return dialogRef.closed;
  }
}
