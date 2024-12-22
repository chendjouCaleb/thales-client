import {Component, OnInit, ViewChild} from "@angular/core";
import {Expense} from "@entities/expense";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";
import {PlusIcon} from "lucide-angular";
import {ExpenseService} from "@app/services/expense.service";

@Component({
  templateUrl: 'expense-list.page.html',
  selector: 'ExpensesSpaceListPage',
  standalone: true
})
export class ExpenseListPage implements OnInit {
  icons = { PlusIcon }
  expenses: Expense[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'agency', 'action'];


  space: Space
  constructor(private _service: ExpenseService,
              //private _uiService: ExpenseUIService,
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
