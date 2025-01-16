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
import {DebtIncome} from "@entities/finance/debt-income";

@Component({
  templateUrl: 'debt-income-delete.html',
  selector: 'DebtIncomeDelete',
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
export class DebtIncomeDelete {
  icons = { ChevronDownIcon }
  debtIncome: DebtIncome

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, DebtIncomeDelete>,
              private _service: DebtService,
              private _snackbar: MatSnackBar) {
    this.debtIncome = data.debtIncome;
  }



  async delete() {
    await this.deleteTask.launch()
    if(this.deleteTask.success) {
      this.deleteTask.result;
      this._dialogRef.close();
      this._snackbar.open(`Le remboursement dette a été supprimé.`, '', { duration: 3000 });
    }
  }

  deleteTask = new Task(async () => {
    await this._service.deleteIncomeAsync(this.debtIncome)
  })
}

