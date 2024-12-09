import {AgencyPage} from "@app/pages/agency/agency.page";
import {ActivatedRoute} from "@angular/router";
import {Component, ViewEncapsulation} from "@angular/core";
import {ProcedureApplyDetails} from "@app/Components/procedure-apply/details/procedure-apply-details";
import {AdminPage} from "@app/pages/admin/admin.page";

@Component({
  selector: 'SpaceProcedureApply',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ProcedureApplyDetails [procedureApplyId]="procedureApplyId"></ProcedureApplyDetails>`,
  imports: [
    ProcedureApplyDetails
  ],
  standalone: true
})
export class SpaceProcedureApply {
  procedureApplyId: number;

  constructor(private _parent: AdminPage,
              private _route: ActivatedRoute) {
   this.procedureApplyId = this._route.snapshot.params['procedureApplyId'];
  }

  async ngOnInit() {

  }
}
