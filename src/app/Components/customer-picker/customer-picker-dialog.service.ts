import {Injectable} from "@angular/core";
import {Customer} from "../../../entities";
import {Observable} from "rxjs";
import {CustomerPicker} from "./customer-picker";
import {Dialog} from "@angular/cdk/dialog";

@Injectable()
export class CustomerPickerDialog {
  constructor(private matDialog: Dialog) {}

  open(): Observable<Customer> {
    const dialogRef = this.matDialog.open<Customer>(CustomerPicker, {
      panelClass: 'picker-dialog-panel'}
    );
    return dialogRef.closed
  }
}
