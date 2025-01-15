import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency, Expense, Income, PlaneTicket, ProcedureApplyStep} from "../../../entities";
import {Observable} from "rxjs";
import {PlaneTicketDelete} from "./delete/plane-ticket-delete";
import {Dialog} from "@angular/cdk/dialog";
import {PlaneTicketAdd} from "@app/Components/plane-tickets/add/plane-ticket-add";
import {PlaneTicketEdit} from "@app/Components/plane-tickets/edit/plane-ticket-edit";
import {ProcedureApplyIncomeAdd} from "@app/Components/procedure-apply/add-expense";
import {ProcedureApplyExpenseAdd} from "@app/Components/procedure-apply/add-income";
import {ProcedureApplyDebtAdd} from "@app/Components/procedure-apply/add-debt";
import {PlaneTicketDebtAdd} from "@app/Components/plane-tickets/add-debt";
import {PlaneTicketExpenseAdd} from "@app/Components/plane-tickets/add-expense";
import {PlaneTicketIncomeAdd} from "@app/Components/plane-tickets/add-income";

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketUIService {
  constructor(private _dialog: Dialog) {}
  deletePlaneTicket(planeTicket: PlaneTicket): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(PlaneTicketDelete,
      { data: {planeTicket}});
    return dialogRef.closed
  }

  editPlaneTicket(planeTicket: PlaneTicket): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(PlaneTicketEdit,
      { data: {planeTicket}});
    return dialogRef.closed
  }

  addPlaneTicket(agency: Agency): Observable<PlaneTicket> {
    const dialogRef = this._dialog.open<PlaneTicket>(PlaneTicketAdd,
      { data: {agency}});
    return dialogRef.closed;
  }


  addIncome(planeTicket: PlaneTicket): Observable<Income> {
    const dialogRef = this._dialog.open<Income>(PlaneTicketIncomeAdd,
      {
        data: {planeTicket},
        autoFocus: true
      });
    return dialogRef.closed;
  }

  addExpense(planeTicket: PlaneTicket): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(PlaneTicketExpenseAdd,
      {
        data: {planeTicket},
        autoFocus: true
      });
    return dialogRef.closed;
  }

  addDebt(planeTicket: PlaneTicket, data: any = {}): Observable<Expense> {
    const dialogRef = this._dialog.open<Expense>(PlaneTicketDebtAdd,
      {
        data: {planeTicket, ...data},
        autoFocus: true
      });
    return dialogRef.closed;
  }
}
