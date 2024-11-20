import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {CustomerArchive} from "@app/customers/archive/customer-archive";
import {Injectable} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";
import {CustomerDelete} from "@app/customers/delete/customer-delete";

@Injectable()
export class CustomerDeleteDialogLauncher {
  constructor(private _dialog: Dialog) {
  }

  launch(customer: Customer): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(CustomerDelete,
      {
        panelClass: 'my-dialog-panel',
        backdropClass: 'my-dialog-backdrop',
        data: {customer}
      });
    return dialogRef.closed;
  }

}
