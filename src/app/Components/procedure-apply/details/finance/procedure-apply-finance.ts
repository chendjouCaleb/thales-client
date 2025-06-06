import {Component, Input, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {RouterLink} from "@angular/router";
import {ProcedureApply} from "@entities/index";
import {ProcedureApplyController} from "@app/Components";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {MyBadge} from "@app/NeoUI";
import {ProcedureApplyProgressBar} from "@app/Components/procedure-apply/progress-bar/procedure-apply-progress-bar";
import {CircleAlertIcon, InfoIcon, LucideAngularModule} from "lucide-angular";
import {ExpensesList} from "@app/Components/expenses/list/expenses-list";
import {IncomeListCard, IncomesList} from "@app/Components/incomes";
import {DebtList} from "@app/Components/debts";
import {ExpenseListCard} from "@app/Components/expenses";
import {DebtListCard} from "@app/Components/debts/list/card/debt-list-card";
import {FinanceOverview} from "@entities/finance/finance-overview";

@Component({
  templateUrl: 'procedure-apply-finance.html',
  selector: 'ProcedureApplyFinance, [ProcedureApplyFinance]',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DecimalPipe,
    MyBadge,
    ProcedureApplyProgressBar,
    LucideAngularModule,
    ExpensesList,
    IncomesList,
    DebtList,
    IncomeListCard,
    ExpenseListCard,
    DebtListCard
  ],
  standalone: true
})
export class ProcedureApplyFinance implements OnInit {
  icons = { CircleAlertIcon, InfoIcon }
  @Input()
  procedureApply: ProcedureApply;

  financeOverview: FinanceOverview

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController) {}

  async ngOnInit() {
    this.financeOverview = this.procedureApply.financeOverview
  }


}
