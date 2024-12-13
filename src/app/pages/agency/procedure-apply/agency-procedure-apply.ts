import {AgencyPage} from "@app/pages/agency/agency.page";
import {ActivatedRoute} from "@angular/router";
import {Component, ViewEncapsulation} from "@angular/core";
import {ProcedureApplyDetails} from "@app/Components/procedure-apply/details/procedure-apply-details";

@Component({
  selector: 'AgencyProcedureApply',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="p-4">
      <div class="fontSize-22">Procédure en cours</div>
      <ProcedureApplyDetails class="mt-4" [procedureApplyId]="procedureApplyId"></ProcedureApplyDetails>
    </div>

  `,
  imports: [
    ProcedureApplyDetails
  ],
  standalone: true
})
export class AgencyProcedureApply {
  procedureApplyId: number;

  constructor(private _parent: AgencyPage,
              private _route: ActivatedRoute) {
   this.procedureApplyId = this._route.snapshot.params['procedureApplyId'];
  }

  async ngOnInit() {

  }
}
