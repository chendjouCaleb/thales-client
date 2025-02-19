export class ExpenseAddModel {
  reason: string = '';
  details: string = '';
  amount: string;
  region: string;

  constructor(value: any = {}) {
    if (value) {
      this.reason = value.reason;
      this.amount = `${value.amount} XAF`;
      this.details = value.details;
    }
  }
}
