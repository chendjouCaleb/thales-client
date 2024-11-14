import {MatDialog} from "@angular/material/dialog";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {CustomerArchive} from "@app/customers/archive/customer-archive";
import {Injectable} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";
import {CustomerArchiveRestore} from "@app/customers/archive/restore/customer-archive-restore";

@Injectable()
export class CustomerArchiveDialogLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(customer: Customer): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(CustomerArchive,
      {
        panelClass: 'my-dialog-panel',
        backdropClass: 'my-dialog-backdrop',
        data: {customer}
      });
    return dialogRef.closed;
  }


  launchRestore(customer: Customer): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(CustomerArchiveRestore,
      {
        panelClass: 'my-dialog-panel',
        backdropClass: 'my-dialog-backdrop',
        data: {customer}
      });
    return dialogRef.closed;
  }
}
