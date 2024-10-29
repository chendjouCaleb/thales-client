import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "@app/services";
import {Payment} from "@entities/payment";
import {PaymentUIService} from "@app/Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";

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

  }

  onClick(row) {
    console.log(row)
  }
}
