import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency} from "@entities/agency";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Payment} from "@entities/payment";
import {Procedure} from "@entities/procedure";
import {ProcedureApplyAdd} from "@app/Components";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyController {
  constructor(private _dialog: MatDialog) {}

  addProcedureApply(agency: Agency, procedure: Procedure, customer: Customer): Observable<Payment> {
    const dialogRef = this._dialog.open(ProcedureApplyAdd, {
      autoFocus: false,
      panelClass: 'dialog-panel', data: {customer, agency}});
    return dialogRef.afterClosed();
  }
}
