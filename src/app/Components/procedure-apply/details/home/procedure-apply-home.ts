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

@Component({
  templateUrl: 'procedure-apply-home.html',
  selector: 'ProcedureApplyHome, [ProcedureApplyHome]',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    PaymentsList,
    DecimalPipe,
    MyBadge,
    ProcedureApplyProgressBar,
    LucideAngularModule
  ],
  standalone: true
})
export class ProcedureApplyHome implements OnInit {
  icons = { CircleAlertIcon }
  @Input()
  procedureApply: ProcedureApply;

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController) {}

  async ngOnInit() {

  }

  openDetails(step: ProcedureApplyStep) {
    this._controller.openStep(step)
  }

}
