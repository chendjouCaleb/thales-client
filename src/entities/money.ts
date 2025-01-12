export class Money {
  readonly amount: number;
  readonly currency: string


  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  static of(amount: number, currency: string = 'XAF'):Money
  {
    return new Money(amount, currency)
  }

  static parse(text: string): Money {
    const tokens = text.split(' ');
    return new Money(+tokens[0], tokens[1]);
  }

  format(): string {
    return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: this.currency}).format(this.amount)
  }

  toString(): string {
    return `${this.amount} ${this.currency}`
  }

  add(...monies: Money[]) {
    let sum = monies.map(m => m.amount).reduce((s, current) => s + current, this.amount) ;
    return new Money(sum, this.currency)
  }

  subtract(...monies: Money[]) {
    const sum = monies.map(m => m.amount).reduce((s, current) => s + current, 0);
    const result = this.amount - sum;
    return new Money(result, this.currency)
  }
}

export function formatCurrency(amount: number, currency: string = 'XAF'): string {
  return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: currency}).format(amount)
}
