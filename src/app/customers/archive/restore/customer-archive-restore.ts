import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'customer-archive-restore.html',
  standalone: true,
  imports: [

    Button
  ],
  selector: 'CustomerArchiveRestore'
})
export class CustomerArchiveRestore {
  private readonly customer: Customer;

  constructor(@Inject(DIALOG_DATA) private data,
              private _dialogRef: DialogRef<CustomerArchiveRestore>,
              private _customerService: CustomerService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
  }

  async restore() {

    await this._customerService.toggleArchivedAsync(this.customer);
    this._snackbar.open("Client restoré.", '', { panelClass: 'snackbar-dark'});
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
