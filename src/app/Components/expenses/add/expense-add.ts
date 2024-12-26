import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Customer} from "@entities/customer";
import {CustomerPickerDialog} from "@app/Components";
import {Agency} from "@entities/agency";
import {ChevronDownIcon, LucideAngularModule} from "lucide-angular";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Expense} from "@entities/finance/expense";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {CleaveModule} from "@app/cleave";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ExpenseService} from "@app/services/expense.service";
import {ExpenseAddModel} from "@app/models";
import {Space} from "@entities/space";

@Component({
  templateUrl: 'expense-add.html',
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
export class ExpenseAdd {
  icons = { ChevronDownIcon }
  customer: Customer;
  space: Space;
  agency?: Agency;

  formGroup = new FormGroup({
    customer: new FormControl<number>(null),
    amount: new FormControl<number>(null),
    reason: new FormControl<string>(''),
    details: new FormControl<string>(''),
  })

  constructor(@Inject(DIALOG_DATA) data: any,
              private _picker: CustomerPickerDialog,
              public _dialogRef: DialogRef<Expense, ExpenseAdd>,
              private _service: ExpenseService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
    this.space = data.space;
    this.agency = data.agency;
  }

  selectCustomer(event) {
    event?.preventDefault();
    event.stopPropagation();
    this._picker.open(this.space.id).subscribe(customer => {

      if(customer) {
        this.customer = customer;
        this.formGroup.controls.customer.setValue(customer.id)
        console.log(this.formGroup.controls.customer.value)
      }
    })
  }

  async validate() {
    await this.addTask.launch()
    if(this.addTask.success) {
      const expense = this.addTask.result;
      this._dialogRef.close(expense);
      this._snackbar.open(`La dépense a été ajoutée.`, '', {duration: 3000});
    }
  }

  addTask = new Task(async () => {
    const model = new ExpenseAddModel(this.formGroup.value);
    return await this._service.addAsync(this.space, this.agency, this.customer, model);
  })
}

