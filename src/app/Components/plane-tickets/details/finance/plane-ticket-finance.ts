import {Component, Input, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {PlaneTicket} from "@entities/index";
import {ProcedureApplyController} from "@app/Components";
import {CircleAlertIcon, InfoIcon, LucideAngularModule} from "lucide-angular";
import {IncomeListCard} from "@app/Components/incomes";
import {ExpenseListCard} from "@app/Components/expenses";
import {DebtListCard} from "@app/Components/debts/list/card/debt-list-card";
import {FinanceOverview} from "@entities/finance/finance-overview";

@Component({
  templateUrl: 'plane-ticket-finance.html',
  selector: 'PlaneTicketFinance, [PlaneTicketFinance]',
  imports: [
    LucideAngularModule,
    IncomeListCard,
    ExpenseListCard,
    DebtListCard
  ],
  standalone: true
})
export class PlaneTicketFinance implements OnInit {
  icons = { CircleAlertIcon, InfoIcon }
  @Input()
  planeTicket: PlaneTicket;

  financeOverview: FinanceOverview

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController) {}

  async ngOnInit() {
    this.financeOverview = this.planeTicket.financeOverview
  }
}
