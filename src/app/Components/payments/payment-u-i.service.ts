import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency, Customer, Payment} from "../../../entities";
import {Observable} from "rxjs";
import {PaymentAdd} from "./add/payment-add";
import {PaymentDelete} from "./delete/payment-delete";
import {Dialog} from "@angular/cdk/dialog";

@Injectable({
  providedIn: 'root'
})
export class PaymentUIService {
  constructor(private _dialog: Dialog) {}

  addPayment(agency: Agency, customer: Customer): Observable<Payment> {
    const dialogRef = this._dialog.open<Payment>(PaymentAdd, {data: {customer, agency}});
    return dialogRef.closed;
  }

  deletePayment(payment: Payment): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(PaymentDelete, {data: {payment}});
    return dialogRef.closed;
  }
}
