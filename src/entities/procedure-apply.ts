import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {Procedure, ProcedureStep} from "./procedure";
import {Payment} from "./payment";
import {Agency} from "./agency";
import {Employee} from "@entities/employee";
import { Space } from "./space";
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
  get isDone(): boolean { return this.doneAt != null }
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
    });

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
    })
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
}
