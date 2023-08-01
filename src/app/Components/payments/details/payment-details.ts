import {Component, Input} from "@angular/core";
import {Payment} from "@entities/payment";


@Component({
  templateUrl: 'payment-details.html'
})
export class PaymentDetails {
  @Input()
  payment: Payment
}
