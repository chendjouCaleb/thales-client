import {Component, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApply} from "@entities/index";

@Component({
  templateUrl: 'procedure-apply-home.page.html'
})
export class ProcedureApplyHomePage implements OnInit {
  apply: ProcedureApply

  constructor(private _service: ProcedureApplyService,
              private _route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this._route.snapshot.params['procedureApplyId'];
    this.apply = await this._service.getByIdAsync(id);
    this._service.getApplyStepsAsync(this.apply).then(steps => {
      this.apply.steps = steps;
    })
  }

}
