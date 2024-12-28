export class DebtAddModel {
  reason: string = '';
  amount: string;
  expireAt: Date

  constructor(value: any = {}) {
    if (value) {
      this.reason = value.reason;
      this.amount = `${value.amount} XAF`;
      this.expireAt = value.expireAt;
    }
  }
}

export interface DebtIncomeAddModel {
  details: string,
  amount: string
}
