import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {ProcedureApplyService} from "@app/services";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";
import {ProcedureApplyPager} from "@app/Components/procedure-apply/details/procedure-apply-pager";
import {ProcedureApplyController} from "@app/Components";

@Component({
  templateUrl: 'procedure-apply-details.html',
  selector: 'ProcedureApplyDetails, [ProcedureApplyDetails]',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    ProcedureApplyHome,
    ProcedureApplyPager
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProcedureApplyDetails implements OnInit {
  @Input()
  procedureApplyId: number;

  procedureApply: ProcedureApply

  getProcedureApply = new Task(async () => {
    this.procedureApply = await this._service.getByIdAsync(this.procedureApplyId);
    this._service.getApplyStepsAsync(this.procedureApply).then(steps => {
      this.procedureApply.steps = steps;
    });
  });

  constructor(private _service: ProcedureApplyService,
              private _controller: ProcedureApplyController) {}

  async ngOnInit() {
    this.getProcedureApply.launch()

  }

  openDetails(step: ProcedureApplyStep) {
    this._controller.openStep(step)
  }
}
