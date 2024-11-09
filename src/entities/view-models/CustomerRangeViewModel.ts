import {Customer} from "@entities/customer";

export class CustomerRangeViewModel {
  customers: Customer[]

  total: number

  constructor(value: any = {}) {
    if (value) {
      this.customers = value.customers?.map(p => new Customer(p));
      this.total = value.total
    }
  }
}
