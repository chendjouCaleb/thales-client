import {Component, Input, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProcedureApply, ProcedureApplyStep} from "@entities/index";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {MyBadge} from "@app/NeoUI";
import {ProcedureApplyProgressBar} from "@app/Components/procedure-apply/progress-bar/procedure-apply-progress-bar";
import {CircleAlertIcon, LucideAngularModule} from "lucide-angular";
import {ExpensesList} from "@app/Components/expenses/list/expenses-list";
import {IncomesList} from "@app/Components/incomes";

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
    IncomesList
  ],
  standalone: true
})
export class ProcedureApplyFinance implements OnInit {
  icons = { CircleAlertIcon }
  @Input()
  procedureApply: ProcedureApply;

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController) {}

  async ngOnInit() {

  }


}
