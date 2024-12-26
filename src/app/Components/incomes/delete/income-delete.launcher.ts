import {Dialog} from "@angular/cdk/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Space} from "@entities/space";
import {Income} from "@entities/finance/income";
import {IncomeAdd} from "@app/Components/incomes/add/income-add";
import {Injectable} from "@angular/core";
import {Agency} from "@entities/agency";
import {IncomeChangeAmount} from "@app/Components/incomes/amount/income-change-amount";
import {IncomeChangeDetails} from "@app/Components/incomes/change-details/income-change-details";
import {IncomeChangeReason} from "@app/Components/incomes/change-reason/income-change-reason";
import {IncomeDelete} from "@app/Components/incomes/delete/income-delete";


@Injectable()
export class IncomeDeleteLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(income: Income): Observable<any> {
    const dialogRef = this._dialog.open(IncomeDelete, {data: {income}});
    return dialogRef.closed;
  }
}
