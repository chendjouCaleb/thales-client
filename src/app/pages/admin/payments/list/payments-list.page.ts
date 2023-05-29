import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "../../../../services";
import {Payment} from "../../../../../entities";
import {PaymentUIService} from "../../../../Components/payments";
import {PaymentsList} from "../../../../Components/payments/list/payments-list";

@Component({
  templateUrl: 'payments-list.page.html'
})
export class PaymentsListPage implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  @ViewChild(PaymentsList)
  paymentList: PaymentsList

  constructor(private _service: PaymentService,
              private _uiService: PaymentUIService) {
  }

  ngOnInit() {

    this._service.listAsync().then(items => {
      this.payments = items;
    })
  }

  addPayment() {
    this._uiService.addPayment(null).subscribe(payment => {
      if (payment) {
        this.paymentList.unshift(payment);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
