import {Dialog} from "@angular/cdk/dialog";
import {Debt} from "@entities/finance/debt";
import {Injectable} from "@angular/core";
import {DebtOverview} from "@app/Components/debts/overview/debt-overview";
import {DebtSettings} from "@app/Components/debts/settings/debt-settings";


@Injectable()
export class DebtSettingsLauncher {
  constructor(private _dialog: Dialog) {}

  launch(debt: Debt) {
    const data = { debtId: debt.id }
    const _dialogRef = this._dialog.open(DebtSettings, { data, disableClose: true });
  }
}
