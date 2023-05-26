import {Component} from "@angular/core";
import {Procedure, ProcedureStep} from "../../../../../entities";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureService} from "../../../../services";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureChangeName} from "../change-name/procedure-change-name";
import {ProcedureDelete} from "../delete/procedure-delete";
import {ProcedureChangeDescription} from "../change-description/procedure-change-description";

@Component({
  templateUrl: 'procedure-settings.page.html'
})
export class ProcedureSettingsPage {
  procedure: Procedure;
  steps: ProcedureStep[] = [];

  constructor(private route: ActivatedRoute,
              private _dialog: MatDialog,
              private _router: Router,
              private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureId = +this.route.snapshot.params['procedureId'];
    this.procedure = await this._service.getByIdAsync(procedureId);
    this.procedure.steps = await this._service.getStepsAsync(this.procedure);
  }

  editName() {
    const dialogRef = this._dialog.open(ProcedureChangeName, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedure}})
  }

  editDescription() {
    const dialogRef = this._dialog.open(ProcedureChangeDescription, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedure}})
  }

  addStep() {}

  delete() {
    const dialogRef = this._dialog.open(ProcedureDelete, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedure}})

    dialogRef.afterClosed().subscribe(deleted => {
      if(deleted) {
        this._router.navigateByUrl('/admin/procedures').then();
      }
    })
  }
}
