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

@Component({
  templateUrl: 'debt-delete.html',
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
export class DebtDelete {
  icons = { ChevronDownIcon }
  debt: Debt

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<void, DebtDelete>,
              private _service: DebtService,
              private _snackbar: MatSnackBar) {
    this.debt = data.debt;
  }



  async delete() {
    await this.deleteTask.launch()
    if(this.deleteTask.success) {
      this.deleteTask.result;
      this._dialogRef.close();
      this._snackbar.open(`La dette a été supprimée.`, '', { duration: 3000 });
    }
  }

  deleteTask = new Task(async () => {
    await this._service.deleteAsync(this.debt)
  })
}

