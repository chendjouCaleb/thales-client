import {Component, Inject} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureFormModel, ProcedureStepFormModel} from "../../../../models";
import {ProcedureAddRemember} from "./procedure-add-remember";

@Component({
  template: `
        <form [formGroup]="formGroup" class="p-4">
          <div class="title-20">Ajouter une étape</div>
          <div class="mt-4">
            <mat-form-field style="width: 100%;">
              <mat-label>Nom de l'étape</mat-label>
              <input type="text" matInput formControlName="name">
            </mat-form-field>
          </div>

          <div>
            <mat-form-field style="width: 100%;">
              <mat-label>Prix</mat-label>
              <input type="text" matInput formControlName="price">
            </mat-form-field>
          </div>

          <div>
            <mat-form-field style="width: 100%;">
              <mat-label>Description</mat-label>
              <textarea  matInput formControlName="description"></textarea>
            </mat-form-field>
          </div>

          <div class="mt-3 align-end">
            <button mat-flat-button mat-dialog-close class="me-3">Annuler</button>

            <button *ngIf="!stepModel" mat-flat-button color="primary" (click)="addModel()">
              <mat-icon>add</mat-icon> Ajouter
            </button>

            <button *ngIf="stepModel" mat-flat-button color="primary" (click)="updateModel()">
              Mettre à jour
            </button>
          </div>
        </form>
  `,
  selector: 'procedure-add-step, [procedure-add-step]'
})
export class ProcedureAddStep {
  stepModel: ProcedureStepFormModel;
  model: ProcedureFormModel;
  remember: ProcedureAddRemember;

  formGroup: FormGroup;


  constructor(private _dialogRef: MatDialogRef<ProcedureAddStep>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.stepModel = data.stepModel;
    this.model = data.model;
    this.remember = data.remember;

    this.formGroup = new FormGroup({
      name: new FormControl(this.stepModel?.name ),
      price: new FormControl<number>(this.stepModel?.price),
      description: new FormControl(this.stepModel?.description),
    });
  }


  addModel() {
    const stepModel = new ProcedureStepFormModel();
    const value = this.formGroup.value;
    stepModel.name = value.name;
    stepModel.price = value.price;
    stepModel.description = value.description;

    this.model.stepModels.push(stepModel);
    this.model.stepModels.forEach((_stepModel, index) => _stepModel.index = index);
    this.remember.stepModels = this.model.stepModels

    this._dialogRef.close(stepModel);
  }

  updateModel() {
      const value = this.formGroup.value;
      this.stepModel.name = value.name;
      this.stepModel.price = value.price;
      this.stepModel.description = value.description;

    this.remember.stepModels = this.model.stepModels
      this._dialogRef.close();
  }
}
