import {BaseEntity} from "../base-entity";
import {Customer} from "../customer";
import {PlaneTicket} from "../plane-ticket";
import {ProcedureApply} from "../procedure-apply";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {Procedure} from "@entities/procedure";
import {User} from "@app/identity";
import {Space} from "@entities/space";
import {DateTime, Duration} from "luxon";
import {Income} from "@entities/finance/income";
import {DebtIncome} from "@entities/finance/debt-income";

export class Debt extends BaseEntity<string> {
  amount: Money;
  reason: string = '';
  details: string = '';
  updatedAt: DateTime;
  expireAt: DateTime;
  doneAt: DateTime;

  customer: Customer;
  customerId: number;

  planeTicket: PlaneTicket;
  planeTicketId: number;

  procedureApply: ProcedureApply;
  procedureApplyId: number;

  procedure: Procedure;
  procedureId: number;

  agency:Agency;
  agencyId: number;

  space: Space
  spaceId: number

  employee: Employee;
  employeeId: number;

  member: Member
  memberId: number;

  user: User
  userId: string;

  debtOwners: DebtOwner[]
  debtElements: DebtElement[]
  debtPersons: DebtPerson[];

  debtIncomes: DebtIncome[];

  elementId: string;

  get amountPaid(): Money {
    return Money.of(0).add(...this.debtIncomes.map(di => di.income.amount))
  }

  get remaining(): Money {
    return this.amount.subtract(this.amountPaid)
  }

  get isPay() {
    return this.amountPaid.amount >= this.amount.amount;
  }

  get isLate(): boolean {
    return this.expireAt && this.late.as('days') >= 1;
  }

  get late(): Duration | null {
    if(!this.expireAt) {
      return null;
    }
    return DateTime.now().diff(this.expireAt, ['months', 'days'])
  }

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.updatedAt = value.updatedAt ? DateTime.fromISO(value.updatedAt) : null;
      this.expireAt = value.expireAt ? DateTime.fromISO(value.expireAt) : null;
      this.doneAt = value.doneAt ? DateTime.fromISO(value.doneAt) : null;
      this.amount = Money.parse(value.amount);

      this.reason = value.reason;
      this.details = value.details;
      this.elementId = value.elementId;

      this.customerId = value.customerId;
      this.planeTicketId = value.planeTicketId;
      this.procedureApplyId = value.procedureApplyId;
      this.procedureId = value.procedureId;

      this.customer = value.customer ? new Customer(value.customer) : null;
      this.planeTicket = value.planeTicket ? new PlaneTicket(value.planeTicket) : null;
      this.procedureApply = value.procedureApply ? new ProcedureApply(value.procedureApply) : null;
      this.procedure = value.procedure ? new Procedure(value.procedure) : null;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;

      //this.memberId = value.memberId;
      this.member = value.member ? new Member(value.member) : undefined;
      this.employee = value.employee ? new Employee(value.employee) : undefined;
      if(this.user) {
        this.member.user = this.user;
      }
      if(this.employee && this.user) {
        this.employee.user = this.user;
      }

      this.debtOwners = value.debtOwners?.map(eo => new DebtOwner(eo));
      this.debtElements = value.debtElements?.map(eo => new DebtElement(eo));
      this.debtPersons = value.debtPersons?.map(eo => new DebtPerson(eo));
      this.debtIncomes = value.debtIncomes?.map(eo => new DebtIncome(eo));
    }
  }

  _hydrateIncomes(incomes: Income[]) {
    this.debtIncomes.forEach(di => {
      di.income = incomes.find(i => i.id == di.incomeId)
    })
  }

  addIncome(debtIncome: DebtIncome) {
    if(this.shouldContainsIncome(debtIncome) && !this.containsIncome(debtIncome)) {
      this.debtIncomes.push(debtIncome);
    }
  }

  shouldContainsIncome(debtIncome: DebtIncome): boolean {
    if(!debtIncome) return false;
    return debtIncome.debtId == this.id;
  }
  containsIncome(debtIncome: DebtIncome): boolean {
    if(!debtIncome) return false;
    return this.debtIncomes.some(di => di.id == debtIncome.id)
  }
}

export class DebtOwner {
  id: string;
  createdAt: Date;
  ownerId: string;

  debtId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.ownerId = value.ownerId;
      this.debtId = value.debtId;
    }
  }
}


export class DebtElement {
  id: string;
  createdAt: Date;
  elementId: string;

  debtId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.elementId = value.elementId;
      this.debtId = value.debtId;
    }
  }
}


export class DebtPerson {
  id: string;
  createdAt: Date;
  personId: string;
  kind: string;

  debtId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.personId = value.personId;
      this.debtId = value.debtId;
      this.kind = value.kind;
    }
  }
}



export class DebtCollection {
  private _items: Debt[]
  get items(): Debt[] {
    return this._items;
  }

  constructor(debts: Debt[] = []) {
    this._items = [...debts]
  }

  contains(debt: Debt): boolean {
    if(!debt) return false;
    return this._items.some(d => d.id === debt.id)
  }

  addDebt(debt: Debt): boolean {
    if(this.contains(debt)) {
      return false;
    }
    this._items.push(debt);
    return true;
  }

  removeDebt(debt: Debt): boolean {
    if(!this.contains(debt)) {
      return false;
    }
    const index = this._items.findIndex(d => d.id == debt.id);
    delete this._items[index];
    return true;
  }
}
