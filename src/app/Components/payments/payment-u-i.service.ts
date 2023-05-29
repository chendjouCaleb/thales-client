import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Customer, Payment} from "../../../entities";
import {Observable} from "rxjs";
import {PaymentAdd} from "./add/payment-add";
import {PaymentDelete} from "./delete/payment-delete";

@Injectable({
  providedIn: 'root'
})
export class PaymentUIService {
  constructor(private _dialog: MatDialog) {}

  addPayment(customer: Customer): Observable<Payment> {
    const dialogRef = this._dialog.open(PaymentAdd, {panelClass: 'dialog-panel', data: {customer}});
    return dialogRef.afterClosed();
  }

  deletePayment(payment: Payment): Observable<boolean> {
    const dialogRef = this._dialog.open(PaymentDelete, {panelClass: 'dialog-panel', data: {payment}});
    return dialogRef.afterClosed();
  }
}
