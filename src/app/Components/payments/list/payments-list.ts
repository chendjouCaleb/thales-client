import {Component, Inject, Input, OnInit} from "@angular/core";

import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentUIService} from "../payment-u-i.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList'
})
export class PaymentsList implements OnInit {
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];


  dataSource = new MatTableDataSource<Payment>();
  isLoading = true;

  selectedPayment: Payment;
  _payments: Payment[]


  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  constructor(private _service: PaymentService,
              private _router: Router,
              private _uiService: PaymentUIService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    let items = await this._service.listAsync(this.params);
    this._payments = items.sort((p1, p2) => p1.id - p2.id).reverse();
    this.dataSource = new MatTableDataSource<Payment>(this._payments);

    this.isLoading = false;

  }

  unshift(payment: Payment) {
    this._payments.unshift(payment);
    this.dataSource = new MatTableDataSource<Payment>(this._payments);
  }

  remove(payment: Payment) {
    this._payments = this._payments.filter(p => p.id !== payment.id)
    this.dataSource = new MatTableDataSource<Payment>(this._payments);
  }

  get payments(): Payment[] {
    return this._payments.map(p => p);
  }

  delete(payment: Payment) {
    this._uiService.deletePayment(payment).subscribe(deleted => {
      if (deleted) {
        this.remove(payment);
      }
    })
  }

  details(payment: Payment) {
    this.selectedPayment = payment;
  }

  printPDF(payment: Payment) {
   this._document.defaultView.open(`${environment.serverUrl}/payments/${payment.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }
}
