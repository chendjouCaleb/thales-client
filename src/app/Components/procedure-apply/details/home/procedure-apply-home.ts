import {Component, Input, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProcedureApply, ProcedureApplyStep} from "@entities/index";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {PaymentsList} from "@app/Components/payments/list/payments-list";

@Component({
  templateUrl: 'procedure-apply-home.html',
  selector: 'ProcedureApplyHome, [ProcedureApplyHome]',
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    PaymentsList,
    DecimalPipe
  ],
  standalone: true
})
export class ProcedureApplyHome implements OnInit {
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
