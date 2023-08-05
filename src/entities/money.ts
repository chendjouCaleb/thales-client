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

  add(...monies: Money[]) {
    let sum = monies.map(m => m.amount).reduce((s, current) => s + current, this.amount) ;
    return new Money(sum, this.currency)
  }

  subtract(...monies: Money[]) {
    let sum = this.amount - monies.map(m => m.amount).reduce((s, current) => s + current);

    return new Money(sum, this.currency)
  }
}
