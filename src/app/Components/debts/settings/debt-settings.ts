import {Component, Inject, Input} from "@angular/core";
import {Debt} from "@entities/finance";
import {ArrowLeftIcon, LucideAngularModule, PencilIcon, Trash2Icon, XIcon} from "lucide-angular";
import {Subscription} from "rxjs";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {DebtChangeAmountLauncher, DebtChangeReasonLauncher, DebtDeleteLauncher} from "@app/Components/debts";
import {DebtService} from "@app/services/debt.service";
import {Task} from "@app/utils";
import {IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {DebtChangeDueAtLauncher} from "@app/Components/debts/change-due-at";

@Component({
  templateUrl: 'debt-settings.html',
  styles: [':host { display: block; width: 616px }'],
  standalone: true,
  imports: [
    IconButton,
    LucideAngularModule,
    NgIf
  ],
  selector: '[DebtSettings], DebtSettings',
  providers: [
    DebtChangeAmountLauncher,
    DebtChangeReasonLauncher,
    DebtDeleteLauncher,
    DebtChangeDueAtLauncher
  ]
})
export class DebtSettings {
  icons = { ArrowLeftIcon, Trash2Icon, PencilIcon, XIcon }
  debtId: string

  debt: Debt
  deleteSubscription: Subscription

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              private _changeAmountLauncher: DebtChangeAmountLauncher,
              private _changeReasonLauncher: DebtChangeReasonLauncher,
              private _changeDeleteLauncher: DebtDeleteLauncher,
              private _changeExpireAtLauncher: DebtChangeDueAtLauncher,
              private _debtService: DebtService) {
    this.debtId = data.debtId;
    this.debt = data.debt;
  }

  ngOnInit() {
    if(!this.debt) {
      this.getDebtTask.launch();
    }
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

  changeExpireAt() {
    this._changeExpireAtLauncher.launch(this.debt);
  }

  delete() {
    this._changeDeleteLauncher.launch(this.debt);
  }
}
