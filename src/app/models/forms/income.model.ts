import {Money} from "@entities/money";

export class IncomeAddModel {
  reason: string = '';
  details: string = '';
  amount: string;
  expireAt: Date

  constructor(value: any = {}) {
    if (value) {
      this.reason = value.reason;
      this.amount = `${value.amount} XAF`;
      this.details = value.details;
      this.expireAt = value.expireAt;
    }
  }
}
