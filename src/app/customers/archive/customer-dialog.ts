import {MatDialog} from "@angular/material/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {CustomerArchive} from "@app/customers/archive/customer-archive";
import {Injectable} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";

@Injectable()
export class CustomerArchiveDialogLauncher {
  constructor(private _dialog: Dialog) {}

  launch(customer: Customer): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(CustomerArchive,
      {panelClass: 'my-dialog-panel',
        data: {customer}});
    return dialogRef.closed;
  }

}
