import {Income} from "@entities/finance/income";
import {Debt} from "@entities/finance/debt";
import {Expense} from "@entities/finance/expense";
import {Money} from "@entities/money";

export class FinanceOverview {
  constructor(public incomes: Income[],
              public debts: Debt[],
              public expenses: Expense[]
  ) {
  }

  get incomeAmount(): Money {
    return this.incomes.map(i => i.amount)
      .reduce((acc, current) => {
        return acc.add(current)
      }, Money.of(0))
  }

  get expenseAmount(): Money {
    return Money.of(0).add(...this.expenses.map(e => e.amount))
  }

  get debtAmount(): Money {
    return Money.of(0).add(...this.debts.map(e => e.amount))
  }

  get debtIncomeAmount(): Money {
    return Money.of(0).add(
      ...this.debts.flatMap(d => d.debtIncomes).map(i => i.income.amount)
    );
  }

  get debtRemainingAmount(): Money {
      return this.debtAmount.subtract(this.debtIncomeAmount)
  }


  addDebt(debt: Debt) {
    if(!this.debts.some(d => d.id == debt.id)) {
      this.debts.push(debt);
    }
  }

  containsDebt(debt: Debt): boolean { return this.debts.some(d => d.id == debt.id)}


  addIncome(income: Income) {
    if(!this.incomes.some(d => d.id == income.id)) {
      this.incomes.push(income);
    }
  }

  containsIncome(income: Income): boolean { return this.incomes.some(d => d.id == income.id)}
}
