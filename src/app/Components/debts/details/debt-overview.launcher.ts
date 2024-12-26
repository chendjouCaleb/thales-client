import {Dialog} from "@angular/cdk/dialog";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtOverview} from "@app/Components/debts/details/debt-overview";


@Injectable()
export class DebtOverviewLauncher {
  constructor(private _dialog: Dialog) {}

  launch(debt:  Debt) {
    const data = { debtId: debt.id }
    const _dialogRef = this._dialog.open(DebtOverview, { data, disableClose: true });
  }
}
