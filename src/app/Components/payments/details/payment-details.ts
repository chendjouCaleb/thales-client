import {Component, Input} from "@angular/core";
import {Payment} from "@entities/payment";


@Component({
  templateUrl: 'payment-details.html',
  selector: 'PaymentDetails',
  standalone: true
})
export class PaymentDetails {
  @Input()
  payment: Payment
}
