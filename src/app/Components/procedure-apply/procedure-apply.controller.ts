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
import { Dialog } from "@angular/cdk/dialog";
import {ProcedureApplyStepHome} from "@app/Components/procedure-apply/step-home/procedure-apply-step-home";
import {ProcedureApplyStepInvalidate} from "@app/Components/procedure-apply/invalidate/procedure-apply-step-invalidate";
import {ProcedureApplyLock} from "@app/Components/procedure-apply/lock/procedure-apply-lock";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyController {
  constructor(private _dialog: Dialog) {}

  addProcedureApply(agency: Agency): Observable<ProcedureApply> {
    const dialogRef = this._dialog.open<ProcedureApply>(ProcedureApplyAdd, {
      autoFocus: false, data: {agency}});
    return dialogRef.closed;
  }

  lock(procedureApply: ProcedureApply): Observable<void> {
    const dialogRef = this._dialog.open<void>(ProcedureApplyLock, {
      autoFocus: false, data: {procedureApply}});
    return dialogRef.closed;
  }

  validate(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepValidate, {
      autoFocus: false, data: {applyStep}});
    return dialogRef.closed;
  }
  invalidate(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepInvalidate, {
      autoFocus: false, data: {applyStep}});
    return dialogRef.closed;
  }


  openStep(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepHome, {
      autoFocus: false, data: {applyStep}});
    return dialogRef.closed;
  }

  addPayment(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepPaymentAdd, {
      autoFocus: false, data: {applyStep}});
    return dialogRef.closed;
  }
}
