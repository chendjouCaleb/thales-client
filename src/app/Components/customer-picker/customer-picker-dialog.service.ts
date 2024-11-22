import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Customer} from "../../../entities";
import {Observable} from "rxjs";
import {CustomerPicker} from "./customer-picker";

@Injectable()
export class CustomerPickerDialog {
  constructor(private matDialog: MatDialog) {}

  open(): Observable<Customer> {
    const dialogRef = this.matDialog.open(CustomerPicker, {
      panelClass: 'picker-dialog-panel'}
    );
    return dialogRef.afterClosed();
  }
}
