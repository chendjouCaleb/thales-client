import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "@entities/customer";
import {CustomerPickerDialog} from "@app/Components";
import {Agency} from "@entities/agency";
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
import {IncomeAddModel} from "@app/models";
import {Space} from "@entities/space";
import {Money} from "@entities/money";

@Component({
  templateUrl: 'income-change-amount.html',
  selector: 'IncomeDelete',
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
export class IncomeChangeAmount {
  icons = { ChevronDownIcon }
  income: Income

  amountControl = new FormControl<number>(null)

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Money, IncomeChangeAmount>,
              private _service: IncomeService,
              private _snackbar: MatSnackBar) {
    this.income = data.income;
    this.amountControl = new FormControl(this.income.amount.amount)
  }



  async change() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const amount = this.addTask.result;
      this._dialogRef.close(amount);
      this._snackbar.open(`Le montant du revenue a été changé.`, '', {duration: 3000});
    }
  }

  addTask = new Task<Money>(async () => {
    const amount = new Money(this.amountControl.value, 'XAF');
    await this._service.changeAmountAsync(this.income, amount);
    return amount;
  })
}

