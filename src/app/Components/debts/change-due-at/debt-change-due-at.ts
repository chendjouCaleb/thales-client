import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {CustomerPickerDialog} from "@app/Components";
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
  templateUrl: 'debt-change-due-at.html',
  selector: 'DebtChangeDueAt',
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
export class DebtChangeDueAt {
  icons = { ChevronDownIcon }
  debt: Debt

  control: FormControl<Date>

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<Date, DebtChangeDueAt>,
              private _service: DebtService,
              private _snackbar: MatSnackBar) {
    this.debt = data.debt;
    this.control = new FormControl(this.debt.expireAt.toJSDate())
  }



  async change() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const expireAt = this.addTask.result;
      this._dialogRef.close(expireAt);
      this._snackbar.open(`La date d'échéance a été changée.`, '', { duration: 3000 });
    }
  }

  addTask = new Task<Date | null>(async () => {
    const dueAt = this.control.value;
    await this._service.changeExpireAtAsync(this.debt, dueAt);
    return dueAt;
  })
}

