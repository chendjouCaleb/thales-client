import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {ProcedureApplyAdd} from "./procedure-apply-add.component";
import {Customer, Procedure} from "../../../entities";

@Injectable()
export class ProcedureApplyDialog {
  constructor(private matDialog: MatDialog) {
  }

  open(procedure: Procedure, customer: Customer): Observable<ProcedureApplyAdd> {
    const data = {
      procedure, customer
    };

    const dialogRef = this.matDialog.open(ProcedureApplyAdd, {data});
    return dialogRef.afterClosed();
  }
}
