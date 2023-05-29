export class PaymentAddFormModel {
  reason: string = '';
  amount: number;

  constructor(value: any = {}) {
    if(value) {
      this.reason = value.reason;
      this.amount = value.amount;
    }
  }
}
