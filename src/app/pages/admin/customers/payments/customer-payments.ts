import {Component, Input, ViewChild} from "@angular/core";
import {Customer, Payment} from "../../../../../entities";
import {PaymentUIService} from "../../../../Components/payments";
import {PaymentsList} from "../../../../Components/payments/list/payments-list";

@Component({
  templateUrl: 'customer-payments.html',
  selector: 'customer-payments'
})
export class CustomerPayments {
  @Input()
  customer: Customer;

  @ViewChild(PaymentsList)
  list: PaymentsList

  constructor(private _service: PaymentUIService) {
  }

  addPayment() {
    this._service.addPayment(this.customer).subscribe(payment => {
      if (payment) {
        this.list.unshift(payment);
      }
    })
  }
}
