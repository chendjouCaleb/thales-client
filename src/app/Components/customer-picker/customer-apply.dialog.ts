import {Inject, Injectable} from "@angular/core";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../entities";
import {Observable} from "rxjs";
import {CustomerPicker} from "./customer-picker";

@Injectable()
export class ProcedureApplyDialog {
  constructor(private matDialog: MatDialog) {
  }

  open(): Observable<Customer> {
    const dialogRef = this.matDialog.open(CustomerPicker);
    return dialogRef.afterClosed();
  }
}
