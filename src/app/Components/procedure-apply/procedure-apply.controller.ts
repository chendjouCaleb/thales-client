import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency} from "@entities/agency";
import {Observable} from "rxjs";
import {ProcedureApplyAdd} from "@app/Components";
import {ProcedureApply} from "@entities/procedure-apply";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyController {
  constructor(private _dialog: MatDialog) {}

  addProcedureApply(agency: Agency): Observable<ProcedureApply> {
    const dialogRef = this._dialog.open(ProcedureApplyAdd, {
      autoFocus: false,
      panelClass: 'dialog-panel', data: {agency}});
    return dialogRef.afterClosed();
  }
}
