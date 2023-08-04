import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency} from "@entities/agency";
import {Observable} from "rxjs";
import {ProcedureApplyAdd} from "@app/Components";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {Payment} from "@entities/payment";
import {ProcedureApplyStepValidate} from "@app/Components/procedure-apply/validate/procedure-apply-step-validate";
import {
  ProcedureApplyStepPaymentAdd
} from "@app/Components/procedure-apply/add-payment/procedure-apply-step-payment-add";

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

  validate(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open(ProcedureApplyStepValidate, {
      autoFocus: false,
      panelClass: 'dialog-panel', data: {applyStep}});
    return dialogRef.afterClosed();
  }

  addPayment(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open(ProcedureApplyStepPaymentAdd, {
      autoFocus: false,
      panelClass: 'dialog-panel', data: {applyStep}});
    return dialogRef.afterClosed();
  }
}
