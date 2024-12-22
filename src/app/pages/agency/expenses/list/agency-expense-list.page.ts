import {Component, OnInit, ViewChild} from "@angular/core";
import {Expense} from "@entities/expense";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Agency} from "@entities/agency";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {ExpenseService} from "@app/services/expense.service";
import {ExpenseAddLauncher} from "@app/Components/expenses/add/expense-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {ExpensesList} from "@app/Components/expenses/list/expenses-list";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'agency-expense-list.page.html',
  selector: 'AgencyExpenseListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple,
    ExpensesList
  ],
  providers: [ ExpenseAddLauncher],
  standalone: true
})
export class AgencyExpenseListPage implements OnInit {
  icons = { PlusIcon }
  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'amount', 'updatedAt', 'reason', 'employee', 'action'];
  params: any


  agency: Agency
  constructor(private _service: ExpenseService,
              //private _uiService: ExpenseUIService,
              public addLauncher: ExpenseAddLauncher,
              private parent: AgencyPage
              ) {
    this.agency = this.parent.agency;
    console.log(this.agency.space)
    this.params = {ownerId: this.agency.ownerId}
  }

  ngOnInit() {

  }

  addExpense() {
    this.addLauncher.addExpense(this.agency.space, this.agency)
  }
}
