import {Component, Inject} from "@angular/core";
import {ProcedureFormModel, ProcedureStepFormModel} from "@app/models";
import {ProcedureAddStep} from "./procedure-add-step";
import {ProcedureAddRemember} from "./procedure-add-remember";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProcedureService} from "@app/services";
import {Space} from "@entities/space";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {DecimalPipe, NgForOf} from "@angular/common";
import {LucideAngularModule, PencilIcon, PlusIcon, XIcon} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {Procedure} from "@entities/procedure";
import {formatCurrency} from "@entities/money";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  templateUrl: 'procedure-add.html',
  selector: 'ProcedureAdd',
  imports: [
    ReactiveFormsModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    DecimalPipe,
    LucideAngularModule,
    Button,
    IconButton,
    NgForOf,
    CdkDrag,
    CdkDropList
  ],
  standalone: true,
  styleUrl: 'procedure-add.scss'
})
export class ProcedureAdd {
  icons = { PlusIcon, PencilIcon, XIcon }
  model = new ProcedureFormModel();
  remember: ProcedureAddRemember;
  formGroup: FormGroup;

  space: Space
  onAdd: (procedure: Procedure) => void

  constructor(private _dialog: Dialog,
              public dialogRef: DialogRef,
              private _snackbar: MatSnackBar,
              private _service: ProcedureService,
              @Inject(DIALOG_DATA)data: any) {
    this.space = data.space;
    this.onAdd = data.onAdd;

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
      data: { model: this.model, remember: this.remember}});
  }

  removeStepModel(stepModel: ProcedureStepFormModel) {
    this.model.stepModels = this.model.stepModels.filter(sm => sm !== stepModel);
    this.model.stepModels.forEach((_stepModel, index) => _stepModel.index = index);
    this.remember.stepModels = this.model.stepModels
  }

  editStepModel(stepModel: ProcedureStepFormModel) {
    const modalRef = this._dialog.open(ProcedureAddStep, {

      data: {stepModel, model: this.model, remember: this.remember}});
  }

  onDragStep(event: CdkDragDrop<any>) {
    console.log(event)
    moveItemInArray(this.model.stepModels, event.previousIndex, event.currentIndex);
    this.model.stepModels.forEach((stepModel, index) => {
      stepModel.index = index
    })
  }

  async addProcedure() {
      const procedure = await this._service.addAsync(this.space, this.model);
      if(this.onAdd) {
        this.onAdd(procedure)
      }
      this._snackbar.open(`La précédure a été ajoutée.`, 'VOIR', {duration: 5000});
      this.dialogRef.close(procedure);
  }

  protected readonly formatCurrency = formatCurrency;
}
