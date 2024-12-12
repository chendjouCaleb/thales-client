import {Component, Inject} from "@angular/core";
import {ProcedureStep} from "@entities/procedure";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureService} from "@app/services";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureDelete} from "../delete/procedure-delete";
import {ProcedureStepChangeName} from "../step-change-name/procedure-step-change-name";
import {ProcedureStepChangeDescription} from "../step-change-description/procedure-step-change-description";
import {ProcedureStepChangePrice} from "../step-change-price/procedure-step-change-price";
import {Button, IconButton} from "@app/ui";
import {LucideAngularModule, PencilIcon, Trash2Icon, XIcon} from "lucide-angular";
import {NgIf} from "@angular/common";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'procedure-step-settings.html',
  selector: 'ProcedureStepSettings',
  imports: [
    Button, LucideAngularModule, NgIf, IconButton
  ],
  standalone: true,
  styles: [`:host {display: block; width: 616px}`]
})
export class ProcedureStepSettings {
  icons = { PencilIcon, Trash2Icon, XIcon }
  procedureStep: ProcedureStep;

  constructor(@Inject(DIALOG_DATA)public readonly data: any,
              public readonly _dialogRef: DialogRef <any, ProcedureStepSettings>,
              private _dialog: Dialog,
              private _router: Router,
              private _service: ProcedureService) {
    this.procedureStep = data.procedureStep;
  }

  editName() {
    const dialogRef = this._dialog.open(ProcedureStepChangeName, {

      data: {procedure: this.procedureStep}})
  }

  editDescription() {
    const dialogRef = this._dialog.open(ProcedureStepChangeDescription, {

      data: {procedure: this.procedureStep}})
  }

  editPrice() {
    const dialogRef = this._dialog.open(ProcedureStepChangePrice, {

      data: {procedure: this.procedureStep}})
  }

  addStep() {}

  delete() {
    const dialogRef = this._dialog.open(ProcedureDelete, {

      data: {procedure: this.procedureStep}})

    dialogRef.closed.subscribe(deleted => {
      if(deleted) {
        this._router.navigateByUrl('/admin/procedures').then();
      }
    })
  }
}
