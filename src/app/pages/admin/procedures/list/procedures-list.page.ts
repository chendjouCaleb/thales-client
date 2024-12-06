import {Component, OnInit} from "@angular/core";
import {ProcedureService} from "@app/services";
import {Procedure, Space} from "../../../../../entities";
import {AdminPage} from "@app/pages/admin/admin.page";

@Component({
  templateUrl: 'procedures-list.page.html'
})
export class ProceduresListPage implements OnInit {
  procedures: Procedure[] = [];
  space: Space;


  constructor(private _service: ProcedureService,
              _parent: AdminPage) {
    this.space = _parent.space;
  }

  ngOnInit() {
    this._service.listAsync().then(items => {
      this.procedures = items;
    });
  }


}
