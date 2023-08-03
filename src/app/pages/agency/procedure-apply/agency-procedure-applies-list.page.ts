import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApplyController} from "@app/Components";
import {Agency} from "@entities/agency";
import {AgencyPage} from "../agency.page";


@Component({
  templateUrl: 'agency-procedure-applies-list.page.html',
})
export class AgencyProcedureAppliesListPage implements OnInit {
  agency: Agency;

  constructor(private route: ActivatedRoute,
              private _parent: AgencyPage,
              private _controller: ProcedureApplyController) {
    this.agency = _parent.agency;
  }

  async ngOnInit() {

  }

  apply() {
    this._controller.addProcedureApply(this.agency, null, null)
  }


}
