import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {CustomerPickerDialog, ProcedureApplyDialog} from "../../../../Components";
import {ProcedureApplyService} from "../../../../services";


@Component({
  templateUrl: 'procedure-applies-list.page.html',
})
export class ProcedureAppliesListPage implements OnInit {

  constructor(private route: ActivatedRoute,
              private _picker: CustomerPickerDialog,
              private _apply: ProcedureApplyDialog,
              private _service: ProcedureApplyService) {}

  async ngOnInit() {

  }

}
