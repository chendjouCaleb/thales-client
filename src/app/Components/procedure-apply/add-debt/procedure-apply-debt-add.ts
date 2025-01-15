import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "@entities/customer";
import {CustomerPickerDialog} from "@app/Components";
import {Agency} from "@entities/agency";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Debt} from "@entities/finance/debt";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DebtService} from "@app/services/debt.service";
import {DebtAddModel} from "@app/models";
import {Space} from "@entities/space";
import {ProcedureApplyStep} from "@entities/procedure-apply";
import {ProcedureApplyService} from "@app/services";

@Component({
  templateUrl: 'procedure-apply-debt-add.html',
  selector: 'PlaneTicketDebtAdd',
  imports: [
    LucideAngularModule,
    TextField,
    CleaveModule,
    TextFieldInput,
    ReactiveFormsModule,
    Button,
    NgIf,
    MatProgressSpinner,
    TextFieldLabel
  ],
  standalone: true,
  providers: [ CustomerPickerDialog ]
})
export class ProcedureApplyDebtAdd {
  icons = { ChevronDownIcon }
  procedureApplyStep : ProcedureApplyStep

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    reason: new FormControl<string>(''),
    details: new FormControl<string>(''),
    expireAt: new FormControl<Date>(null),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Debt, ProcedureApplyDebtAdd>,
              private _service: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.procedureApplyStep = data.procedureApplyStep;
    this.formGroup.controls.amount.setValue(data.amount?.amount)
  }


  async add() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const debt = this.addTask.result;
      this._dialogRef.close(debt);
      this._snackbar.open(`La dette a été ajoutée.`, '', {duration: 3000});
    }
  }

  addTask = new Task(async () => {
    const model = new DebtAddModel(this.formGroup.value);
    return await this._service.addDebtAsync(this.procedureApplyStep, model);
  })
}

