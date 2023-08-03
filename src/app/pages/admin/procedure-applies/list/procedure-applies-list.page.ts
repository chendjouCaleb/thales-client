import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApplyService} from "@app/services";


@Component({
  templateUrl: 'procedure-applies-list.page.html',
})
export class ProcedureAppliesListPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private _service: ProcedureApplyService) {}

  async ngOnInit() {

  }

}
