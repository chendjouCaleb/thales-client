import {Component, Inject, OnInit} from "@angular/core";
import {Expense} from "@entities/expense";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Task} from "@app/utils";
import {ExpenseService} from "@app/services/expense.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ArrowLeftIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {NgIf} from "@angular/common";
import {ExpenseChangeAmountLauncher} from "@app/Components/expenses/amount/expense-change-amount.launcher";

@Component({
  templateUrl: 'expense-details.html',
  selector: 'ExpenseDetails',
  styles: [':host { display: block; width: 616px }'],
  imports: [
    MatProgressSpinner,
    LucideAngularModule,
    IconButton,
    NgIf,
    Button
  ],
  providers: [ ExpenseChangeAmountLauncher ],
  standalone: true
})
export class ExpenseDetails implements OnInit {
  icons = { ArrowLeftIcon, Trash2Icon}
  expenseId: string

  expense: Expense

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef,
              private _changeAmountLauncher: ExpenseChangeAmountLauncher,
              private _expenseService: ExpenseService) {
    this.expenseId = data.expenseId
  }

  ngOnInit() {
    this.getExpenseTask.launch()
  }


  getExpenseTask = new Task(async () => {
    this.expense = await this._expenseService.getAsync(this.expenseId);
  });

  changeAmount() {
    this._changeAmountLauncher.launch(this.expense);
  }
}
