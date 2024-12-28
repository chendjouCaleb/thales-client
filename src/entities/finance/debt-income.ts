import {BaseEntity} from "@entities/base-entity";
import {Debt, DebtElement, DebtOwner, DebtPerson} from "@entities/finance/debt";
import {Income} from "@entities/finance/income";

export class DebtIncome extends BaseEntity<string> {
  incomeId: string;
  income: Income;

  debtId: string;
  debt: Debt

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.incomeId = value.incomeId;
      this.debtId = value.debtId;

      this.debt = value.debt ? new Debt(value.debt) : null;
      this.income = value.income ? new Income(value.income) : null;
    }
  }
}
