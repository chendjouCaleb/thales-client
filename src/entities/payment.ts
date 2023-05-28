import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";

export class Payment extends BaseEntity<number>  {
  amount: number = 0;
  reason: string = '';
  customer: Customer;
  customerId: number;
}

