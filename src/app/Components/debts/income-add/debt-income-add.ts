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
import {DebtIncomeAddModel, IncomeAddModel} from "@app/models";
import {Space} from "@entities/space";
import {IncomeService} from "@app/services/income.service";
import {Debt} from "@entities/finance";
import {DebtIncome} from "@entities/finance/debt-income";
import {DebtService} from "@app/services/debt.service";

@Component({
  templateUrl: 'debt-income-add.html',
  selector: 'DebtIncomeAdd',
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
  standalone: true
})
export class DebtIncomeAdd {
  icons = { ChevronDownIcon }
  debt: Debt

  formGroup = new FormGroup({
    amount: new FormControl<number>(null),
    details: new FormControl<string>(''),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<DebtIncome, DebtIncomeAdd>,
              private _service: DebtService,
              private _snackbar: MatSnackBar) {
    this.debt = data.debt;
  }


  async addIncome() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const income = this.addTask.result;
      this._dialogRef.close(income);
      this._snackbar.open(`La recouvrement a été ajouté.`, '', {duration: 3000});
    }
  }

  addTask = new Task<DebtIncome>(async () => {
    const value = this.formGroup.value;

    const model: DebtIncomeAddModel = {
      amount : `${value.amount} XAF`,
      details: value.details
    }
    return await this._service.addIncomeAsync(this.debt, model);
  })
}

