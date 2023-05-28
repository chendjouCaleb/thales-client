import {Component, OnInit} from "@angular/core";
import {ProcedureService} from "../../../../services/procedure.service";
import {Procedure} from "../../../../../entities";

@Component({
  templateUrl: 'procedures-list.page.html'
})
export class ProceduresListPage implements OnInit {
  procedures: Procedure[] = [];


  constructor(private _service: ProcedureService) {}

  ngOnInit() {
    this._service.listAsync().then(items => {
      this.procedures = items;
    });
  }


}
