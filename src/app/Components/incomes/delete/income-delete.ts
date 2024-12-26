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
  templateUrl: 'income-delete.html',
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
  standalone: true
})
export class IncomeDelete {
  icons = { ChevronDownIcon }
  income: Income

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, IncomeDelete>,
              private _service: IncomeService,
              private _snackbar: MatSnackBar) {
    this.income = data.income;
  }



  async delete() {
    await this.deleteTask.launch()
    if(this.deleteTask.success) {
      this.deleteTask.result;
      this._dialogRef.close();
      this._snackbar.open(`Le revenu a été supprimée.`, '', { duration: 3000 });
    }
  }

  deleteTask = new Task(async () => {
    await this._service.deleteAsync(this.income)
  })
}

