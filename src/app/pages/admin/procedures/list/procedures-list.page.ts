import {Component, OnInit} from "@angular/core";
import {ProcedureService} from "@app/services";
import {Procedure} from "@entities/procedure";
import {AdminPage} from "@app/pages/admin/admin.page";
import {ProcedureAddDialog} from "@app/pages/admin/procedures/add";
import {Space} from "@entities/space";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {Button} from "@app/ui";
import {RouterLink} from "@angular/router";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'procedures-list.page.html',
  selector: 'ProcedureListPage',
  standalone: true,
  imports: [LucideAngularModule, Button, RouterLink, MatProgressSpinner, NgIf],
  providers: [ ProcedureAddDialog ]
})
export class ProceduresListPage implements OnInit {
  procedures: Procedure[] = [];
  space: Space
  icons = { PlusIcon };

  getProcedureListTask = new Task(async () => {
    this.procedures = await this._service.listAsync({spaceId: this.space.id});
  })

  constructor(private _service: ProcedureService,
              private _procedureAddDialog: ProcedureAddDialog,
              public parent: AdminPage) {
    this.space = parent.space;
  }

  ngOnInit() {
    this.getProcedureListTask.launch()
  }

  launchAdd() {
    this._procedureAddDialog.open(this.space,
      (procedure) => { this.procedures.unshift(procedure)
    });
  }
}
