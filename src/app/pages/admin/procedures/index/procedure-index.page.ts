import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ProcedureService} from "../../../../services/procedure.service";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {MatTabGroup} from "@angular/material/tabs";
import {MatTabGroupRemember} from "../../../../utils/mat-tab-remember";
import {AdminPage} from "@app/pages/admin/admin.page";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {ProceduresPageModule} from "@app/pages/admin/procedures/procedures.page.module";
import {TraceModule} from "@app/trace";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {ProcedureHome} from "@app/pages/admin/procedures/home/procedure-home";
import {Location, NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Button, IconButton} from "@app/ui";
import {ArrowLeftIcon, LucideAngularModule, SettingsIcon} from "lucide-angular";

@Component({
  templateUrl: 'procedure-index.page.html',
  selector: 'ProcedureIndexPage',
  imports: [
    TabRow,
    TabRowItem,
    HorizontalPager,
    PageContentDef,
    TraceModule,
    ProcedureApplyList,
    ProcedureHome,
    NgIf,
    MatProgressSpinner,
    IconButton,
    LucideAngularModule,
    Button,
    RouterLink
  ],
  standalone: true
})
export class ProcedureIndexPage implements OnInit {
  icons = { ArrowLeftIcon, SettingsIcon }
  procedure: Procedure;
  activeLink: string = '';
  steps: ProcedureStep[] = [];


  tabGroupRemember = new MatTabGroupRemember('procedure-index.ts-tab');

  constructor(private route: ActivatedRoute,
              public parent: AdminPage,
              public _location: Location,
              private _service: ProcedureService) {}

  async ngOnInit() {
    this.getProcedureTask.launch()
  }


  getProcedureTask = new Task<Procedure>(async () => {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.procedure.steps = await this._service.getStepsAsync(this.procedure);
    return this.procedure
  })
}
