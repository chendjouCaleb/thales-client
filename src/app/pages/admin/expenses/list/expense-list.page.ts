import {Component, OnInit, ViewChild} from "@angular/core";
import {Expense} from "@entities/finance/expense";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {ExpenseService} from "@app/services/expense.service";
import {ExpenseAddLauncher} from "@app/Components/expenses/add/expense-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {ExpensesList} from "@app/Components/expenses/list/expenses-list";

@Component({
  templateUrl: 'expense-list.page.html',
  selector: 'ExpensesSpaceListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple,
    ExpensesList
  ],
  providers: [ ExpenseAddLauncher],
  standalone: true
})
export class ExpenseListPage implements OnInit {
  icons = { PlusIcon }
  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'amount', 'updatedAt', 'reason', 'agency', 'member', 'action'];
  params: any


  expenseFilter = (expense: Expense) => {
    return !!expense.expenseOwners.find(eo => eo.ownerId == this.space.ownerId)
  }
  space: Space
  constructor(private _service: ExpenseService,
              //private _uiService: ExpenseUIService,
              public addLauncher: ExpenseAddLauncher,
              private parent: AdminPage
              ) {
    this.space = this.parent.space;
    this.params = {ownerId: this.space.ownerId}
  }

  ngOnInit() {

  }

  onClick(row) {
    console.log(row)
  }
}
