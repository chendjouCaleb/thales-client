import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";

export class Payment extends BaseEntity<number> {
  amount: number = 0;
  reason: string = '';
  customer: Customer;
  customerId: number;


  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.amount = value.amount;
      this.reason = value.reason;
      this.customerId = value.customerId;
      this.customer = value.customer ? new Customer(value.customer) : null;
    }
  }
}

