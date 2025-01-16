import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Debt} from "@entities/finance/debt";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Task} from "@app/utils";
import {DebtService} from "@app/services/debt.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {
  ArrowLeftIcon,
  DollarSignIcon,
  LucideAngularModule,
  PencilIcon,
  SettingsIcon,
  Trash2Icon,
  XIcon
} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {DebtChangeAmountLauncher} from "@app/Components/debts/amount/debt-change-amount.launcher";
import {DebtChangeReasonLauncher} from "@app/Components/debts/change-reason";
import {MatTooltip} from "@angular/material/tooltip";
import {DebtDeleteLauncher} from "@app/Components/debts/delete";
import {Subscription} from "rxjs";
import {DebtPager} from "@app/Components/debts/overview/debt.pager";
import {DebtSettingsLauncher} from "@app/Components/debts/settings";
import {DebtIncomeAddLauncher} from "@app/Components/debts/income-add/debt-income-add.launcher";
import {DebtStateStore} from "@app/services/debt-state-store";

@Component({
  templateUrl: 'debt-overview.html',
  selector: 'DebtOverview',
  styles: [':host { display: block; width: 616px; height: 600px }'],
  imports: [
    MatProgressSpinner,
    LucideAngularModule,
    IconButton,
    NgIf,
    Button,
    MatTooltip,
    DebtPager
  ],
  providers: [DebtChangeAmountLauncher,
    DebtSettingsLauncher,
    DebtDeleteLauncher,
    DebtIncomeAddLauncher
  ],
  standalone: true
})
export class DebtOverview implements OnInit, OnDestroy {
  icons = {
    ArrowLeftIcon, Trash2Icon, PencilIcon, XIcon,
    SettingsIcon, DollarSignIcon
  }
  debtId: string

  debt: Debt
  deleteSubscription: Subscription

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              public settingsLauncher: DebtSettingsLauncher,
              private _changeDeleteLauncher: DebtDeleteLauncher,
              private _debtIncomeAddLauncher: DebtIncomeAddLauncher,
              private _debtService: DebtService,
              private _debtStateStore: DebtStateStore) {
    this.debtId = data.debtId
  }

  ngOnInit() {
    this.getDebtTask.launch();
    this.deleteSubscription = this._debtService.debtDelete.subscribe((deletedDebt) => {
      if (deletedDebt.id === this.debt.id) {
        this._dialogRef.close()
      }
    })
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe()
  }


  getDebtTask = new Task(async () => {
    this.debt = await this._debtService.getAsync(this.debtId);
    this._debtStateStore.debts.addDebt(this.debt);
  });

  addIncome() {
    this._debtIncomeAddLauncher.launch(this.debt);
  }

  delete() {
    this._changeDeleteLauncher.launch(this.debt);
  }
}
