import {Component} from "@angular/core";
import {ProcedureFormModel, ProcedureStepFormModel} from "@app/models";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProcedureAddStep} from "./procedure-add-step";
import {ProcedureAddRemember} from "./procedure-add-remember";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureService} from "@app/services";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'procedure-add.page.html'
})
export class ProcedureAddPage {
  model = new ProcedureFormModel();
  remember: ProcedureAddRemember;
  formGroup: FormGroup;

  constructor(private _dialog: MatDialog,
              private _snackbar: MatSnackBar,
              private _router: Router,
              private _service: ProcedureService) {

    this.remember = new ProcedureAddRemember();
    this.formGroup = new FormGroup({
      name : new FormControl(this.remember.name),
      description: new FormControl(this.remember.description)
    });
    this.model.name = this.remember.name;
    this.model.description = this.remember.description;
    this.model.stepModels = this.remember.stepModels ?? [];

    this.formGroup.valueChanges.subscribe(value => {
      this.remember.name = value.name;
      this.remember.description = value.description;

      this.model.name = value.name;
      this.model.description = value.description;
    });
  }

  addStepModel() {
    const modalRef = this._dialog.open(ProcedureAddStep, {
      panelClass: 'dialog-panel', data: { model: this.model, remember: this.remember}});
  }

  removeStepModel(stepModel: ProcedureStepFormModel) {
    this.model.stepModels = this.model.stepModels.filter(sm => sm !== stepModel);
    this.model.stepModels.forEach((_stepModel, index) => _stepModel.index = index);
    this.remember.stepModels = this.model.stepModels
  }

  editStepModel(stepModel: ProcedureStepFormModel) {
    const modalRef = this._dialog.open(ProcedureAddStep, {panelClass: 'dialog-panel',
      data: {stepModel, model: this.model, remember: this.remember}});
  }

  async addStep() {
      const procedure = await this._service.addAsync(this.model);
      this._snackbar.open(`La précédure a été ajoutée.`, 'VOIR', {})
        .onAction().subscribe(() => {
          this._router.navigateByUrl(`/admin/procedures/${procedure.id}`).then()
      });
  }

}
