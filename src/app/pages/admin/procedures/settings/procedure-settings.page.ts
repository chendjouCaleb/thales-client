import {Component} from "@angular/core";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProcedureService} from "../../../../services";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureChangeName} from "../change-name/procedure-change-name";
import {ProcedureDelete} from "../delete/procedure-delete";
import {ProcedureChangeDescription} from "../change-description/procedure-change-description";
import {LucideAngularModule, PencilIcon, PlusIcon, Trash2Icon} from "lucide-angular";
import {Button} from "@app/ui";
import {NgForOf, NgIf} from "@angular/common";
import {Dialog} from "@angular/cdk/dialog";
import {AdminPage} from "@app/pages/admin/admin.page";
import {ProcedureStepSettings} from "@app/pages/admin/procedures/step-settings/procedure-step-settings";

@Component({
  templateUrl: 'procedure-settings.page.html',
  selector: 'ProcedureSettings',
  standalone: true,
  imports: [LucideAngularModule, Button, NgIf, RouterLink, NgForOf]
})
export class ProcedureSettingsPage {
  icons = { PencilIcon, PlusIcon, Trash2Icon }
  procedure: Procedure;
  steps: ProcedureStep[] = [];

  constructor(private route: ActivatedRoute,
              private _dialog: Dialog,
              private _router: Router,
              public parent: AdminPage,
              private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.procedure.steps = await this._service.getStepsAsync(this.procedure);
  }

  openStepSettings(procedureStep: ProcedureStep) {
    const dialogRef = this._dialog.open(ProcedureStepSettings, {
      data: {procedureStep}})
  }

  editName() {
    const dialogRef = this._dialog.open(ProcedureChangeName, {
      data: {procedure: this.procedure}})
  }

  editDescription() {
    const dialogRef = this._dialog.open(ProcedureChangeDescription, {
      data: {procedure: this.procedure}})
  }

  addStep() {}

  delete() {
    const dialogRef = this._dialog.open(ProcedureDelete, {
      data: {procedure: this.procedure}})

    dialogRef.closed.subscribe(deleted => {
      if(deleted) {
        this._router.navigateByUrl('/admin/procedures').then();
      }
    })
  }

  protected readonly open = open;
}
