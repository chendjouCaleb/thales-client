import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Expense} from "@entities/expense";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Task} from "@app/utils";
import {ExpenseService} from "@app/services/expense.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ArrowLeftIcon, LucideAngularModule, PencilIcon, Trash2Icon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {ExpenseChangeAmountLauncher} from "@app/Components/expenses/amount/expense-change-amount.launcher";
import {ExpenseChangeDetailsLauncher} from "@app/Components/expenses/change-details";
import {ExpenseChangeReasonLauncher} from "@app/Components/expenses/change-reason";
import {MatTooltip} from "@angular/material/tooltip";
import {ExpenseDeleteLauncher} from "@app/Components/expenses/delete";
import {Subscription} from "rxjs";

@Component({
  templateUrl: 'expense-details.html',
  selector: 'ExpenseDetails',
  styles: [':host { display: block; width: 616px }'],
  imports: [
    MatProgressSpinner,
    LucideAngularModule,
    IconButton,
    NgIf,
    Button,
    MatTooltip
  ],
  providers: [ ExpenseChangeAmountLauncher,
    ExpenseChangeReasonLauncher,
    ExpenseChangeDetailsLauncher,
    ExpenseDeleteLauncher,
  ],
  standalone: true
})
export class ExpenseDetails implements OnInit, OnDestroy {
  icons = { ArrowLeftIcon, Trash2Icon, PencilIcon, }
  expenseId: string

  expense: Expense
  deleteSubscription: Subscription

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              private _changeAmountLauncher: ExpenseChangeAmountLauncher,
              private _changeDetailsLauncher: ExpenseChangeDetailsLauncher,
              private _changeReasonLauncher: ExpenseChangeReasonLauncher,
              private _changeDeleteLauncher: ExpenseDeleteLauncher,
              private _expenseService: ExpenseService) {
    this.expenseId = data.expenseId
  }

  ngOnInit() {
    this.getExpenseTask.launch();
    this.deleteSubscription = this._expenseService.expenseDelete.subscribe((deletedExpense) => {
      if(deletedExpense.id === this.expense.id) {
        this._dialogRef.close()
      }
    })
  }

  ngOnDestroy() {
    this.deleteSubscription.unsubscribe()
  }


  getExpenseTask = new Task(async () => {
    this.expense = await this._expenseService.getAsync(this.expenseId);
  });

  changeAmount() {
    this._changeAmountLauncher.launch(this.expense);
  }

  changeDetails() {
    this._changeDetailsLauncher.launch(this.expense);
  }

  changeReason() {
    this._changeReasonLauncher.launch(this.expense);
  }

  delete() {
    this._changeDeleteLauncher.launch(this.expense);
  }
}
