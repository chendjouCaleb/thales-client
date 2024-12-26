import {Dialog} from "@angular/cdk/dialog";
import {Income} from "@entities/finance/income";
import {IncomeDetails} from "@app/Components/incomes/details/income-details";
import {Injectable} from "@angular/core";


@Injectable()
export class IncomeDetailsLauncher {
  constructor(private _dialog: Dialog) {}

  launch(income:  Income) {
    const data = { incomeId: income.id }
    const _dialogRef = this._dialog.open(IncomeDetails, { data, disableClose: true });
  }
}
