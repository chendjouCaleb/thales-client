import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency} from "@entities/agency";
import {Observable} from "rxjs";
import {ProcedureApplyAdd} from "@app/Components";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {Payment} from "@entities/payment";
import {ProcedureApplyStepValidate} from "@app/Components/procedure-apply/validate/procedure-apply-step-validate";
import {
  ProcedureApplyStepChangePrice
} from "@app/Components/procedure-apply/change-price/procedure-apply-step-change-price";
import {Dialog} from "@angular/cdk/dialog";
import {ProcedureApplyStepHome} from "@app/Components/procedure-apply/step-home/procedure-apply-step-home";
import {ProcedureApplyStepInvalidate} from "@app/Components/procedure-apply/invalidate/procedure-apply-step-invalidate";
import {ProcedureApplyLock} from "@app/Components/procedure-apply/lock/procedure-apply-lock";
import {ProcedureApplyUnlock} from "@app/Components/procedure-apply/unlock/procedure-apply-unlock";
import {ProcedureApplyLockedAlert} from "@app/Components/procedure-apply/procedure-apply-locked-alert";
import {ProcedureApplyDone} from "@app/Components/procedure-apply/done/procedure-apply-done";
import {ProcedureApplyUndone} from "@app/Components/procedure-apply/undone/procedure-apply-undone";
import {Space} from "@entities/space";
import {Customer} from "@entities/customer";
import {Expense, Income} from "@entities/finance";
import {IncomeAdd} from "@app/Components/incomes";
import {ProcedureApplyExpenseAdd} from "@app/Components/procedure-apply/add-income";
import {ProcedureApplyIncomeAdd} from "@app/Components/procedure-apply/add-expense";
import {ProcedureApplyDebtAdd} from "@app/Components/procedure-apply/add-debt";
import {
  ProcedureApplyStepPaymentAdd
} from "@app/Components/procedure-apply/add-payment-1/procedure-apply-step-payment-add";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyController {
  constructor(private _dialog: Dialog) {
  }

  addProcedureApply(agency: Agency): Observable<ProcedureApply> {
    const dialogRef = this._dialog.open<ProcedureApply>(ProcedureApplyAdd, {
      autoFocus: true, data: {agency}
    });
    return dialogRef.closed;
  }

  checkLocked(procedureApply: ProcedureApply): boolean {
    if (procedureApply.isLocked) {
      this._dialog.open(ProcedureApplyLockedAlert)
      return false
    }
    return true
  }

  done(procedureApply: ProcedureApply): Observable<void> {
    if (!this.checkLocked(procedureApply)) {
      return new Observable((subscriber) => subscriber.next());
    }
    const dialogRef = this._dialog.open<void>(ProcedureApplyDone, {
      autoFocus: true, data: {procedureApply}
    });
    return dialogRef.closed;
  }

  undone(procedureApply: ProcedureApply): Observable<void> {
    if (!this.checkLocked(procedureApply)) {
      return new Observable((subscriber) => subscriber.next());
    }
    const dialogRef = this._dialog.open<void>(ProcedureApplyUndone, {
      autoFocus: true, data: {procedureApply}
    });
    return dialogRef.closed;
  }

  lock(procedureApply: ProcedureApply): Observable<void> {
    const dialogRef = this._dialog.open<void>(ProcedureApplyLock, {
      autoFocus: true, data: {procedureApply}
    });
    return dialogRef.closed;
  }

  unlock(procedureApply: ProcedureApply): Observable<void> {
    const dialogRef = this._dialog.open<void>(ProcedureApplyUnlock, {
      autoFocus: true, data: {procedureApply}
    });
    return dialogRef.closed;
  }

  validate(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepValidate, {
      autoFocus: true, data: {applyStep}
    });
    return dialogRef.closed;
  }

  invalidate(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepInvalidate, {
      autoFocus: true, data: {applyStep}
    });
    return dialogRef.closed;
  }


  openStep(procedureApplyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepHome, {
      autoFocus: true, data: {procedureApplyStep}
    });
    return dialogRef.closed;
  }

  changeStepPrice(procedureApplyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepChangePrice, {
      autoFocus: true, data: {procedureApplyStep}
    });
    return dialogRef.closed;
  }

  addPayment(applyStep: ProcedureApplyStep): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(ProcedureApplyStepPaymentAdd, {
      autoFocus: false, data: {applyStep}
    });
    return dialogRef.closed;
  }


  addIncome(procedureApplyStep: ProcedureApplyStep): Observable<Income> {
    const dialogRef = this._dialog.open<Income>(ProcedureApplyIncomeAdd,
      {
        data: {procedureApplyStep},
        autoFocus: true
      });
    return dialogRef.closed;
  }

  addExpense(procedureApplyStep: ProcedureApplyStep): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(ProcedureApplyExpenseAdd,
      {
        data: {procedureApplyStep},
        autoFocus: true
      });
    return dialogRef.closed;
  }

  addDebt(procedureApplyStep: ProcedureApplyStep, data: any = {}): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(ProcedureApplyDebtAdd,
      {
        data: {procedureApplyStep, ...data},
        autoFocus: true
      });
    return dialogRef.closed;
  }
}
