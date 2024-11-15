import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Customer} from "@entities/customer";
import {CustomerService} from "@app/services";
import {Button} from "@app/ui";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'customer-archive.html',
  standalone: true,
  imports: [

    Button
  ],
  selector: 'CustomerArchiveRestore'
})
export class CustomerArchive {
  private readonly customer: Customer;

  constructor(@Inject(DIALOG_DATA) private data,
              private _dialogRef: DialogRef<CustomerArchive>,
              private _customerService: CustomerService,
              private _snackbar: MatSnackBar) {
    this.customer = data.customer;
  }

  async changeInfo() {

    await this._customerService.toggleArchivedAsync(this.customer);
    this._snackbar.open("Client archivé.", '',
      { panelClass: 'snackbar-dark', duration: 2000});
    this._dialogRef.close();
  }

  close() {
    this._dialogRef.close()
  }
}
