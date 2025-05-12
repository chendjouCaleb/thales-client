import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {DateTime} from "luxon";
import {Payment} from "./payment";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Space} from "@entities/space";
import {Debt, Expense, Income} from "@entities/finance";
import {FinanceOverview} from "@entities/finance/finance-overview";
import {Member} from "@entities/member";

export class PlaneTicket extends BaseEntity<number> {

  placeCount: number = 0;
  backAndForth: boolean;
  travelClass: string = '';

  departureCountry: string = '';
  departureCity: string = '';
  departureDate: DateTime;

  arrivalCountry: string = '';
  arrivalCity: string = '';
  returnDate: DateTime;

  customer: Customer;
  customerId: number;

  agency: Agency;
  agencyId: number;

  space: Space;
  spaceId: number;

  employee: Employee;
  employeeId: number;

  payments: Payment[] = [];
  paymentAmount: number;
  totalPayment: Money

  price: Money;

  employees: Employee[];
  members: Member[];
  expenses: Expense[] = [];
  incomes: Income[] = [];
  debts: Debt[] = [];
  financeOverview: FinanceOverview


  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.elementId = value.elementId;
      this.placeCount = value.placeCount;
      this.backAndForth = value.backAndForth;
      this.travelClass = value.travelClass;

      this.price = value.price ? Money.parse(value.price) : undefined;
      this.totalPayment = value.totalPayment ? Money.parse(value.totalPayment) : undefined;

      this.departureCountry = value.departureCountry;
      this.departureCity = value.departureCity;
      this.departureDate = value.departureDate ? DateTime.fromISO(value.departureDate) : null;

      this.arrivalCountry = value.arrivalCountry;
      this.arrivalCity = value.arrivalCity;
      this.returnDate = value.returnDate ? DateTime.fromISO(value.returnDate) : null;

      this.customerId = value.customerId;
      this.customer = value.customer ? new Customer(value.customer) : null;
      this.payments = value.payments ? value.payments.map(p => new Payment(p)) : null;
      this.paymentAmount = value.paymentAmount;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : undefined;


      this.debts = value.debts ? value.debts.map(s => new Debt(s)) : [];
      this.incomes = value.incomes ? value.incomes.map(s => new Income(s)) : [];
      this.expenses = value.expenses ? value.expenses.map(s => new Expense(s)) : [];

      this.employees = value.employees ? value.employees.map(s => new Employee(s)) : [];
      this.members = value.members ? value.members.map(s => new Member(s)) : [];

      //this.debts?.forEach(debt => debt._hydrateIncomes(this.incomes));
    }
  }

  _hydrate() {
    this.financeOverview = new FinanceOverview(
      this.incomes,
      this.debts,
      this.expenses
    )

    this.debts.flatMap(d => d.debtIncomes).forEach(di => {
      //di.income = this.incomes.find(income => income.id == di.incomeId);
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
      console.log(`New income on planeTicket #${this.code}`)
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

