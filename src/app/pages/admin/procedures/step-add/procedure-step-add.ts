import {Component, Inject} from "@angular/core";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProcedureStepFormModel} from "@app/models";
import {CleaveModule} from "@app/cleave";
import {NgIf} from "@angular/common";
import {PencilIcon, PlusIcon, XIcon} from "lucide-angular";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {ProcedureService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'procedure-step-add.html',
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
export class ProcedureStepAdd {
  icons = {PlusIcon, PencilIcon, XIcon}

  procedure: Procedure

  formGroup: FormGroup;

  constructor(public readonly _dialogRef: DialogRef<ProcedureStep, ProcedureStepAdd>,
              private readonly _procedureService: ProcedureService,
              private _snackbar: MatSnackBar,
              @Inject(DIALOG_DATA) data: any) {

    this.procedure = data.procedure;
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      price: new FormControl<number>(0),
      description: new FormControl(''),
    });
  }


  async addStep() {
    const stepModel = new ProcedureStepFormModel();
    const value = this.formGroup.value;
    stepModel.name = value.name;
    stepModel.price = value.price;
    stepModel.description = value.description;

    const step = await this._procedureService.addStepAsync(this.procedure,  stepModel);
    this._snackbar.open(`Une étape a été ajoutée à la procédure.`, '', {duration: 5000})

    this._dialogRef.close(step);
  }
}
