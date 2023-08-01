import {Component, Input} from "@angular/core";
import {Payment} from "@entities/payment";


@Component({
  templateUrl: 'payment-details.html',
  selector: 'PaymentDetails'
})
export class PaymentDetails {
  @Input()
  payment: Payment
}
