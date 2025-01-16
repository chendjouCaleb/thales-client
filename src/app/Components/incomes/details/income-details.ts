import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Income} from "@entities/finance/income";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Task} from "@app/utils";
import {IncomeService} from "@app/services/income.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ArrowLeftIcon, LucideAngularModule, PencilIcon, Trash2Icon, XIcon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {IncomeChangeAmountLauncher} from "@app/Components/incomes/amount/income-change-amount.launcher";
import {IncomeChangeDetailsLauncher} from "@app/Components/incomes/change-details";
import {IncomeChangeReasonLauncher} from "@app/Components/incomes/change-reason";
import {MatTooltip} from "@angular/material/tooltip";
import {IncomeDeleteLauncher} from "@app/Components/incomes/delete";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'income-details.html',
  selector: 'IncomeDetails',
  styles: [':host { display: block; width: 616px }'],
  imports: [
    MatProgressSpinner,
    LucideAngularModule,
    IconButton,
    NgIf,
    Button,
    MatTooltip
  ],
  providers: [ IncomeChangeAmountLauncher,
    IncomeChangeReasonLauncher,
    IncomeChangeDetailsLauncher,
    IncomeDeleteLauncher,
  ],
  standalone: true
})
export class IncomeDetails implements OnInit, OnDestroy {
  icons = { ArrowLeftIcon, Trash2Icon, PencilIcon, XIcon}
  incomeId: string

  income: Income
  deleteSubscription: Subscription

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              private _changeAmountLauncher: IncomeChangeAmountLauncher,
              private _changeDetailsLauncher: IncomeChangeDetailsLauncher,
              private _changeReasonLauncher: IncomeChangeReasonLauncher,
              private _changeDeleteLauncher: IncomeDeleteLauncher,
              private _incomeService: IncomeService) {
    this.incomeId = data.incomeId
  }

  ngOnInit() {
    this.getIncomeTask.launch();
    this.deleteSubscription = this._incomeService.incomeDelete.subscribe((deletedIncome) => {
      if(deletedIncome.id === this.income.id) {
        this._dialogRef.close()
      }
    })
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe()
  }


  getIncomeTask = new Task(async () => {
    this.income = await this._incomeService.getAsync(this.incomeId);
  });

  changeAmount() {
    this._changeAmountLauncher.launch(this.income);
  }

  changeDetails() {
    this._changeDetailsLauncher.launch(this.income);
  }

  changeReason() {
    this._changeReasonLauncher.launch(this.income);
  }

  delete() {
    this._changeDeleteLauncher.launch(this.income);
  }
}
