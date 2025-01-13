import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {Procedure, ProcedureStep} from "./procedure";
import {Payment} from "./payment";
import {Agency} from "./agency";
import {Employee} from "@entities/employee";
import {Space} from "./space";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {DateTime} from "luxon";
import {Debt, Expense, Income} from "@entities/finance";
import {FinanceOverview} from "@entities/finance/finance-overview";

export class ProcedureApply extends BaseEntity<number> {
  elementId: string;

  customer: Customer;
  customerId: number;

  procedure: Procedure;
  procedureId: number;

  agency: Agency;
  agencyId: number;

  space: Space;
  spaceId: number;

  employee: Employee;
  employeeId: number;

  isLocked: boolean
  doneAt?: DateTime

  get isDone(): boolean {
    return this.doneAt != null
  }

  doneByMember?: Member
  doneByMemberId?: number

  procedureApplySteps: ProcedureApplyStep[] = [];

  totalPayment: Money;

  debtAmount: Money
  debtRemainingAmount: Money
  incomeAmount: Money
  expenseAmount: Money

  debts: Debt[];
  incomes: Income[];
  expenses: Expense[];

  employees: Employee[];
  members: Member[];

  financeOverview: FinanceOverview

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.elementId = value.elementId;
      this.isLocked = value.isLocked;
      this.doneAt = value.doneAt ? DateTime.fromISO(value.doneAt) : null;
      this.doneByMember = value.doneByMember ? new Member(value.doneByMember) : undefined;
      this.doneByMemberId = value.doneByMemberId;


      this.customerId = value.customerId;
      this.customer = value.customer ? new Customer(value.customer) : undefined;

      this.procedureId = value.procedureId;
      this.procedure = value.procedure ? new Procedure(value.procedure) : undefined;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.procedureApplySteps = value.procedureApplySteps ? value.procedureApplySteps.map(s => new ProcedureApplyStep(s)) : undefined;
      this.procedureApplySteps?.sort((a, b) => a.procedureStep?.index)

      this.totalPayment = value.totalPayment ? Money.parse(value.totalPayment) : undefined;
      this.debtAmount = value.debtAmount ? Money.parse(value.debtAmount) : undefined;
      this.debtRemainingAmount = value.debtRemainingAmount ? Money.parse(value.debtRemainingAmount) : undefined;
      this.incomeAmount = value.incomeAmount ? Money.parse(value.incomeAmount) : undefined;
      this.expenseAmount = value.expenseAmount ? Money.parse(value.expenseAmount) : undefined;


      this.debts = value.debts ? value.debts.map(s => new Debt(s)) : undefined;
      this.incomes = value.incomes ? value.incomes.map(s => new Income(s)) : undefined;
      this.expenses = value.expenses ? value.expenses.map(s => new Expense(s)) : undefined;

      this.employees = value.employees ? value.employees.map(s => new Employee(s)) : undefined;
      this.members = value.members ? value.members.map(s => new Member(s)) : undefined;

      this.debts?.forEach(debt => debt._hydrateIncomes(this.incomes));
    }
  }

  _hydrate() {
    this.procedureApplySteps.forEach(step => {
      step.debts = this.debts.filter(debt =>
        debt.debtElements.some(de => de.elementId == step.elementId)
      );

      step.incomes = this.incomes.filter(income =>
        income.incomeElements.some(de => de.elementId == step.elementId)
      );

      step.expenses = this.expenses.filter(expense =>
        expense.expenseElements.some(de => de.elementId == step.elementId)
      );
      step.financeOverview = new FinanceOverview(
        step.incomes,
        step.debts,
        step.expenses
      )
    });

    this.financeOverview = new FinanceOverview(
      this.incomes,
      this.debts,
      this.expenses
    )

    this.debts.flatMap(d => d.debtIncomes).forEach(di => {
      di.income = this.incomes.find(income => income.id == di.incomeId);
    });

    this.debts.forEach(debt => {
      const memberPersonId = debt.debtPersons.find(dp => dp.kind === 'MEMBER').personId;
      debt.member = this.members.find(m => m.personId == memberPersonId)
    });

    this.incomes.forEach(income => {
      const memberPersonId = income.incomePersons.find(dp => dp.kind === 'MEMBER').personId;
      income.member = this.members.find(m => m.personId == memberPersonId)
    });

    this.expenses.forEach(expense => {
      const memberPersonId = expense.expensePersons.find(dp => dp.kind === 'MEMBER').personId;
      expense.member = this.members.find(m => m.personId == memberPersonId)
    });
  }


  addIncome(income: Income): boolean {
    if (this.shouldContainsIncome(income) && !this.containsIncome(income)) {
      this.incomes.unshift(income);
      this.financeOverview.addIncome(income);
      console.log('new income')
      return true;
    }
    return false;
  }

  removeIncome(income: Income): boolean {
    if (this.containsIncome(income)) {
      this.incomes = this.incomes.filter(e => e.id !== income.id)
      this.financeOverview.removeIncome(income);
      return true;
    }
    return false;
  }


  shouldContainsIncome(income: Income): boolean {
    return income.incomeElements.some(ee => ee.elementId == this.elementId);
  }

  containsIncome(income: Income): boolean {
    return this.incomes.some(ee => ee.id == income.id);
  }



  addExpense(expense: Expense): boolean {
    if (this.shouldContainsExpense(expense) && !this.containsExpense(expense)) {
      this.expenses.unshift(expense);
      this.financeOverview.addExpense(expense);
      console.log('new expense')
      return true;
    }
    return false;
  }

  removeExpense(expense: Expense): boolean {
    if (this.containsExpense(expense)) {
      this.expenses = this.expenses.filter(e => e.id !== expense.id)
      this.financeOverview.removeExpense(expense);
      return true;
    }
    return false;
  }


  shouldContainsExpense(expense: Expense): boolean {
    return expense.expenseElements.some(ee => ee.elementId == this.elementId);
  }

  containsExpense(expense: Expense): boolean {
    return this.expenses.some(ee => ee.id == expense.id);
  }



  addDebt(debt: Debt): boolean {
    if (this.containsDebt(debt) && !this.containsDebt(debt)) {
      this.debts.unshift(debt);
      this.financeOverview.addDebt(debt);
      return true;
    }
    return false;
  }

  removeDebt(debt: Debt): boolean {
    if (this.containsDebt(debt)) {
      this.debts = this.debts.filter(e => e.id !== debt.id)
      this.financeOverview.removeDebt(debt);
      return true;
    }
    return false;
  }


  shouldContainsDebt(debt: Debt): boolean {
    return debt.debtElements.some(ee => ee.elementId == this.elementId);
  }

  containsDebt(debt: Debt): boolean {
    return this.debts.some(ee => ee.id == debt.id);
  }
}


export class ProcedureApplyStep extends BaseEntity<number> {
  elementId: string
  procedureApply: ProcedureApply;
  procedureApplyId: number;

  procedureStep: ProcedureStep
  procedureStepId: number;

  employee: Employee
  employeeId: number;

  agency: Agency;
  agencyId: number;

  validated: boolean;
  validatedAt: DateTime
  validatedByEmployee: Employee
  validatedByEmployeeId: number

  paymentAmount: number = 0;
  totalPayment: Money

  price: Money = Money.of(0)

  payments: Payment[] = [];
  incomes: Income[] = [];
  debts: Debt[] = [];
  expenses: Expense[] = [];
  debtAmount: Money
  debtRemainingAmount: Money
  incomeAmount: Money
  expenseAmount: Money

  financeOverview: FinanceOverview


  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.elementId = value.elementId;
      this.procedureApplyId = value.procedureApplyId;
      this.procedureStepId = value.procedureStepId;

      this.procedureStep = value.procedureStep ? new ProcedureStep(value.procedureStep) : null;
      this.procedureApply = value.procedureApply ? new ProcedureApply(value.procedureApply) : null;
      this.payments = value.payments ? value.payments.map(p => new Payment(p)) : null;

      this.validated = value.validated;
      this.validatedAt = value.validatedAt ? DateTime.fromISO(value.validatedAt) : null;
      this.validatedByEmployeeId = value.validatedByEmployeeId;
      this.validatedByEmployee = value.validatedByEmployee ? new Employee(value.validatedByEmployee) : null;

      this.paymentAmount = value.paymentAmount;

      this.totalPayment = value.totalPayment ? Money.parse(value.totalPayment) : undefined;
      this.price = value.price ? Money.parse(value.price) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : null;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : null;

      this.debtAmount = value.debtAmount ? Money.parse(value.debtAmount) : undefined;
      this.debtRemainingAmount = value.debtRemainingAmount ? Money.parse(value.debtRemainingAmount) : undefined;
      this.incomeAmount = value.incomeAmount ? Money.parse(value.incomeAmount) : undefined;
      this.expenseAmount = value.expenseAmount ? Money.parse(value.expenseAmount) : undefined;
    }
  }

  addExpense(expense: Expense): boolean {
    if (this.shouldContainsExpense(expense) && !this.containsExpense(expense)) {
      this.expenses.unshift(expense);
      this.financeOverview.addExpense(expense);
      return true;
    }
    return false;
  }

  removeExpense(expense: Expense): boolean {
    if (this.containsExpense(expense)) {
      this.expenses = this.expenses.filter(e => e.id !== expense.id)
      this.financeOverview.removeExpense(expense);
      return true;
    }
    return false;
  }

  shouldContainsExpense(expense: Expense): boolean {
    return expense.expenseElements.some(ee => ee.elementId == this.elementId);
  }

  containsExpense(expense: Expense): boolean {
    return this.expenses.some(ee => ee.id == expense.id);
  }



  addIncome(income: Income): boolean {
    if (this.shouldContainsIncome(income) && !this.containsIncome(income)) {
      this.incomes.unshift(income);
      this.financeOverview.addIncome(income);
      return true;
    }
    return false;
  }

  removeIncome(income: Income): boolean {
    if (this.containsIncome(income)) {
      this.incomes = this.incomes.filter(e => e.id !== income.id)
      this.financeOverview.removeIncome(income);
      return true;
    }
    return false;
  }

  shouldContainsIncome(income: Income): boolean {
    return income.incomeElements.some(ee => ee.elementId == this.elementId);
  }

  containsIncome(income: Income): boolean {
    return this.incomes.some(ee => ee.id == income.id);
  }


  addDebt(debt: Debt): boolean {
    if (this.shouldContainsDebt(debt) && !this.containsDebt(debt)) {
      this.debts.unshift(debt);
      this.financeOverview.addDebt(debt);
      return true;
    }
    return false;
  }

  removeDebt(debt: Debt): boolean {
    if (this.containsDebt(debt)) {
      this.debts = this.debts.filter(e => e.id !== debt.id)
      this.financeOverview.removeDebt(debt);
      return true;
    }
    return false;
  }

  shouldContainsDebt(debt: Debt): boolean {
    return debt.debtElements.some(ee => ee.elementId == this.elementId);
  }

  containsDebt(debt: Debt): boolean {
    return this.debts.some(ee => ee.id == debt.id);
  }
}
