import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Debt} from "@entities/finance/debt";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DebtService} from "@app/services/debt.service";
import {Money} from "@entities/money";

@Component({
  templateUrl: 'debt-change-amount.html',
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
  providers: [  ]
})
export class DebtChangeAmount {
  icons = { ChevronDownIcon }
  debt: Debt

  amountControl = new FormControl<number>(null)

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Money, DebtChangeAmount>,
              private _service: DebtService,
              private _snackbar: MatSnackBar) {
    this.debt = data.debt;
    this.amountControl = new FormControl(this.debt.amount.amount)
  }



  async change() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const amount = this.addTask.result;
      this._dialogRef.close(amount);
      this._snackbar.open(`Le montant de la dette a été changé.`, '', {duration: 3000});
    }
  }

  addTask = new Task<Money>(async () => {
    const amount = new Money(this.amountControl.value, 'XAF');
    await this._service.changeAmountAsync(this.debt, amount);
    return amount;
  })
}

