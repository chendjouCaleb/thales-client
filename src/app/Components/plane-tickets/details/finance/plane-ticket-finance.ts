import {Component, Input, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {PlaneTicket, ProcedureApply, ProcedureApplyStep} from "@entities/index";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
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
  templateUrl: 'plane-ticket-finance.html',
  selector: 'PlaneTicketFinance, [PlaneTicketFinance]',
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
