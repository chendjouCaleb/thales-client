export class ExpenseAddModel {
  reason: string = '';
  details: string = '';
  amount: number;

  constructor(value: any = {}) {
    if (value) {
      this.reason = value.reason;
      this.amount = value.amount;
      this.details = value.details;
    }
  }
}
