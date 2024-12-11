import {Component, Inject} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ProcedureFormModel, ProcedureStepFormModel} from "@app/models";
import {ProcedureAddRemember} from "./procedure-add-remember";
import {CleaveModule} from "@app/cleave";
import {NgIf} from "@angular/common";
import {PencilIcon, PlusIcon, XIcon} from "lucide-angular";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'procedure-add-step.html',
  selector: 'procedure-add-step, [procedure-add-step]',
  imports: [
    CleaveModule,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    TextField,
    TextFieldLabel,
    TextFieldInput,
    Button
  ],
  standalone: true
})
export class ProcedureAddStep {
  icons = {PlusIcon, PencilIcon, XIcon}

  stepModel: ProcedureStepFormModel;
  model: ProcedureFormModel;
  remember: ProcedureAddRemember;

  formGroup: FormGroup;


  constructor(public readonly _dialogRef: DialogRef<ProcedureStepFormModel, ProcedureAddStep>,
              @Inject(DIALOG_DATA) data: any) {
    this.stepModel = data.stepModel;
    this.model = data.model;
    this.remember = data.remember;

    this.formGroup = new FormGroup({
      name: new FormControl(this.stepModel?.name),
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
