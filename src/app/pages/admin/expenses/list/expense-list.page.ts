import {Component, OnInit, ViewChild} from "@angular/core";
import {Expense} from "@entities/expense";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {ExpenseService} from "@app/services/expense.service";
import {ExpenseAddLauncher} from "@app/Components/expenses/add/expense-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";

@Component({
  templateUrl: 'expense-list.page.html',
  selector: 'ExpensesSpaceListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple
  ],
  providers: [ ExpenseAddLauncher],
  standalone: true
})
export class ExpenseListPage implements OnInit {
  icons = { PlusIcon }
  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'agency', 'action'];


  space: Space
  constructor(private _service: ExpenseService,
              //private _uiService: ExpenseUIService,
              public addLauncher: ExpenseAddLauncher,
              private parent: AdminPage
              ) {
    this.space = this.parent.space;
  }

  ngOnInit() {

  }

  onClick(row) {
    console.log(row)
  }
}
