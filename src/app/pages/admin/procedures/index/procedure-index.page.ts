import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProcedureService} from "../../../../services/procedure.service";
import {Procedure, ProcedureStep} from "../../../../../entities";

@Component({
  templateUrl: 'procedure-index.page.html'
})
export class ProcedureIndexPage implements OnInit {
  procedure: Procedure;
  activeLink: string = '';
  steps: ProcedureStep[] = [];

  constructor(private route: ActivatedRoute, private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.procedure.steps = await this._service.getStepsAsync(this.procedure);
  }
}
