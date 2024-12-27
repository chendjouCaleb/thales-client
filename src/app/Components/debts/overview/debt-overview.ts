import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Debt} from "@entities/finance/debt";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Task} from "@app/utils";
import {DebtService} from "@app/services/debt.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ArrowLeftIcon, LucideAngularModule, PencilIcon, Trash2Icon, XIcon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {DebtChangeAmountLauncher} from "@app/Components/debts/amount/debt-change-amount.launcher";
import {DebtChangeReasonLauncher} from "@app/Components/debts/change-reason";
import {MatTooltip} from "@angular/material/tooltip";
import {DebtDeleteLauncher} from "@app/Components/debts/delete";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'debt-overview.html',
  selector: 'DebtOverview',
  styles: [':host { display: block; width: 616px }'],
  imports: [
    MatProgressSpinner,
    LucideAngularModule,
    IconButton,
    NgIf,
    Button,
    MatTooltip
  ],
  providers: [ DebtChangeAmountLauncher,
    DebtChangeReasonLauncher,
    DebtDeleteLauncher,
  ],
  standalone: true
})
export class DebtOverview implements OnInit, OnDestroy {
  icons = { ArrowLeftIcon, Trash2Icon, PencilIcon, XIcon }
  debtId: string

  debt: Debt
  deleteSubscription: Subscription

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              private _changeAmountLauncher: DebtChangeAmountLauncher,
              private _changeReasonLauncher: DebtChangeReasonLauncher,
              private _changeDeleteLauncher: DebtDeleteLauncher,
              private _debtService: DebtService) {
    this.debtId = data.debtId
  }

  ngOnInit() {
    this.getDebtTask.launch();
    this.deleteSubscription = this._debtService.debtDelete.subscribe((deletedDebt) => {
      if(deletedDebt.id === this.debt.id) {
        this._dialogRef.close()
      }
    })
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe()
  }


  getDebtTask = new Task(async () => {
    this.debt = await this._debtService.getAsync(this.debtId);
  });

  changeAmount() {
    this._changeAmountLauncher.launch(this.debt);
  }

  changeReason() {
    this._changeReasonLauncher.launch(this.debt);
  }

  delete() {
    this._changeDeleteLauncher.launch(this.debt);
  }
}
