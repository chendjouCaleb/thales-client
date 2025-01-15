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
import {PlaneTicketService, ProcedureApplyService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";

@Component({
  templateUrl: 'plane-ticket-debt-add.html',
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
  standalone: true
})
export class PlaneTicketDebtAdd {
  icons = { ChevronDownIcon }
  planeTicket : PlaneTicket

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    reason: new FormControl<string>(''),
    details: new FormControl<string>(''),
    expireAt: new FormControl<Date>(null),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Debt, PlaneTicketDebtAdd>,
              private _service: PlaneTicketService,
              private _snackbar: MatSnackBar) {
    this.planeTicket = data.planeTicket;
    this.formGroup.controls.amount.setValue(data.amount?.amount)
  }


  async add() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const debt = this.addTask.result;
      this._dialogRef.close(debt);
      this._snackbar.open(`La dette a été ajoutée au billet d'avion.`, '', {duration: 3000});
    }
  }

  addTask = new Task(async () => {
    const model = new DebtAddModel(this.formGroup.value);
    return await this._service.addDebtAsync(this.planeTicket, model);
  })
}

