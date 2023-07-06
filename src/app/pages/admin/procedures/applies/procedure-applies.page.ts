import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Procedure, ProcedureApply} from "../../../../../entities";
import {CustomerPickerDialog, ProcedureApplyDialog} from "../../../../Components";
import {ProcedureApplyService} from "../../../../services";


@Component({
  templateUrl: 'procedure-applies.page.html',
  selector: 'procedure-applies'
})
export class ProcedureAppliesPage implements OnInit {
  @Input()
  procedure: Procedure;

  applies: ProcedureApply[] = [];

  constructor(private route: ActivatedRoute,
              private _picker: CustomerPickerDialog,
              private _apply: ProcedureApplyDialog,
              private _service: ProcedureApplyService) {}

  async ngOnInit() {
    // const procedureId = +this.route.snapshot.params['procedureId'];
    // this.procedure = await this._service.getByIdAsync(procedureId);
    // this.procedure.steps = await this._service.getStepsAsync(this.procedure);
    this.applies = await this._service.listByProcedureAsync(this.procedure);
  }

  apply() {
    this._picker.open().subscribe(customer => {
      if(customer) {
        this._apply.open(this.procedure, customer);
      }
    });
  }
}
