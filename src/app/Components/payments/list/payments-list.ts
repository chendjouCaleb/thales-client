import {Component, Inject, Input, OnInit} from "@angular/core";

import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentUIService} from "../payment-u-i.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {PaymentViewModel} from "@entities/view-models";

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList'
})
export class PaymentsList implements OnInit {
  @Input()
  params: any = {}

  @Input()
  displayedColumns: string [] = [];

  isLoading = true;

  selectedPayment: PaymentViewModel;
  payments: Payment[] = []

  get _payments(): Payment[] {
    return this.payments;
  }


  columns: string[] = [ 'code',  'amount',  'reason', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  constructor(private _service: PaymentService,
              private _router: Router,
              private _uiService: PaymentUIService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    let params = {...this.params, includeCustomer: true, includeEmployee: true}
    let items = await this._service.listAsync(params);
    this.payments = items.payments;
    this.isLoading = false;

  }

  unshift(payment: Payment) {
    this.payments.unshift(payment);
  }

  remove(payment: Payment) {
    this.payments = this.payments.filter(p => p.id !== payment.id)
  }


  delete(payment: Payment) {
    this._uiService.deletePayment(payment).subscribe(deleted => {
      if (deleted) {
        this.remove(payment);
      }
    })
  }


  printPDF(payment: Payment) {
   this._document.defaultView.open(`${environment.serverUrl}/payments/${payment.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }
}
