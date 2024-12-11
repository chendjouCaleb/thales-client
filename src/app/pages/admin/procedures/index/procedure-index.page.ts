import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ProcedureService} from "../../../../services/procedure.service";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {MatTabGroup} from "@angular/material/tabs";
import {MatTabGroupRemember} from "../../../../utils/mat-tab-remember";
import {AdminPage} from "@app/pages/admin/admin.page";

@Component({
  templateUrl: 'procedure-index.page.html'
})
export class ProcedureIndexPage implements OnInit {
  procedure: Procedure;
  activeLink: string = '';
  steps: ProcedureStep[] = [];

  @ViewChild('tabGroup')
  tabGroup: MatTabGroup;
  tabGroupRemember = new MatTabGroupRemember('procedure-index-tab');

  constructor(private route: ActivatedRoute,
              public parent: AdminPage,
              private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.procedure.steps = await this._service.getStepsAsync(this.procedure);

    this.tabGroupRemember.attach(this.tabGroup);
  }

}
