export class Money {
  readonly amount: number;
  readonly currency: string


  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  static parse(text: string): Money {
    const tokens = text.split(' ');
    return new Money(+tokens[0], tokens[1]);
  }
}
