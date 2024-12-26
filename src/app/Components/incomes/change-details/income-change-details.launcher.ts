import {Dialog} from "@angular/cdk/dialog";
import {Observable} from "rxjs";
import {Income} from "@entities/finance/income";
import {Injectable} from "@angular/core";
import {IncomeChangeDetails} from "@app/Components/incomes/change-details/income-change-details";


@Injectable()
export class IncomeChangeDetailsLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(income: Income): Observable<any> {
    const dialogRef = this._dialog.open(IncomeChangeDetails, {data: {income}});
    return dialogRef.closed;
  }
}
