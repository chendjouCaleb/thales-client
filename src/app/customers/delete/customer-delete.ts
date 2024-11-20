import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'customer-delete.html',
  standalone: true,
  imports: [

    Button
  ],
  selector: 'CustomerArchiveRestore'
})
export class CustomerDelete {
  readonly customer: Customer;

  constructor(@Inject(DIALOG_DATA) private data,
              private _dialogRef: DialogRef<boolean>,
              private _customerService: CustomerService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
  }

  async delete() {

    await this._customerService.deleteAsync(this.customer);
    this._snackbar.open("Client supprimé.", '',
      { panelClass: 'snackbar-dark', duration: 2000});
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close(false)
  }
}
