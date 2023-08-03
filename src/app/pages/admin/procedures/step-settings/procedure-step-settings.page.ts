import {Component} from "@angular/core";
import {ProcedureStep} from "@entities/procedure";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureService} from "@app/services";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureDelete} from "../delete/procedure-delete";
import {ProcedureStepChangeName} from "../step-change-name/procedure-step-change-name";
import {ProcedureStepChangeDescription} from "../step-change-description/procedure-step-change-description";
import {ProcedureStepChangePrice} from "../step-change-price/procedure-step-change-price";

@Component({
  templateUrl: 'procedure-step-settings.page.html'
})
export class ProcedureStepSettingsPage {
  procedureStep: ProcedureStep;

  constructor(private route: ActivatedRoute,
              private _dialog: MatDialog,
              private _router: Router,
              private _service: ProcedureService) {}

  async ngOnInit() {
    const procedureStepId = +this.route.snapshot.params['procedureStepId'];
    this.procedureStep = await this._service.getStepAsync(procedureStepId);
  }

  editName() {
    const dialogRef = this._dialog.open(ProcedureStepChangeName, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedureStep}})
  }

  editDescription() {
    const dialogRef = this._dialog.open(ProcedureStepChangeDescription, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedureStep}})
  }

  editPrice() {
    const dialogRef = this._dialog.open(ProcedureStepChangePrice, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedureStep}})
  }

  addStep() {}

  delete() {
    const dialogRef = this._dialog.open(ProcedureDelete, {
      panelClass: 'dialog-panel',
      data: {procedure: this.procedureStep}})

    dialogRef.afterClosed().subscribe(deleted => {
      if(deleted) {
        this._router.navigateByUrl('/admin/procedures').then();
      }
    })
  }
}
