import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency} from "@entities/agency";
import {Customer} from "@entities/customer";
import {Observable} from "rxjs";
import {Procedure} from "@entities/procedure";
import {ProcedureApplyAdd} from "@app/Components";
import {ProcedureApply} from "@entities/procedure-apply";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyController {
  constructor(private _dialog: MatDialog) {}

  addProcedureApply(agency: Agency, procedure: Procedure, customer: Customer): Observable<ProcedureApply> {
    const dialogRef = this._dialog.open(ProcedureApplyAdd, {
      autoFocus: false,
      panelClass: 'dialog-panel', data: {customer, agency}});
    return dialogRef.afterClosed();
  }
}
