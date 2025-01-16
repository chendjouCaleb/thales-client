import {BaseEntity} from "@entities/base-entity";
import {Debt, DebtElement, DebtOwner, DebtPerson} from "@entities/finance/debt";
import {Income} from "@entities/finance/income";

export class DebtIncome {
  id: string;
  createdAt: Date;

  debtId: string;
  debt: Debt;

  income: Income
  incomeId: string

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.incomeId = value.incomeId;
      this.debtId = value.debtId;

      this.debt = value.debt ? new Debt(value.debt) : undefined;
      this.income = value.income ? new Income(value.income) : undefined;
      console.log(this.income)
    }
  }
}
