import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CustomerPickerDialog} from "@app/Components";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Income} from "@entities/finance/income";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {IncomeService} from "@app/services/income.service";

@Component({
  templateUrl: 'income-change-reason.html',
  selector: 'IncomeChangeReason',
  imports: [
    LucideAngularModule,
    TextField,
    CleaveModule,
    TextFieldInput,
    ReactiveFormsModule,
    Button,
    NgIf,
    MatProgressSpinner
  ],
  standalone: true,
  providers: [ CustomerPickerDialog ]
})
export class IncomeChangeReason {
  icons = { ChevronDownIcon }
  income: Income

  control = new FormControl<string>('')

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<string, IncomeChangeReason>,
              private _service: IncomeService,
              private _snackbar: MatSnackBar) {
    this.income = data.income;
    this.control = new FormControl(this.income.reason)
  }



  async change() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const details = this.addTask.result;
      this._dialogRef.close(details);
      this._snackbar.open(`La raison du revenu a été changée.`, '', { duration: 3000 });
    }
  }

  addTask = new Task<string>(async () => {
    const reason = this.control.value;
    await this._service.changeReasonAsync(this.income, reason);
    return reason;
  })
}

