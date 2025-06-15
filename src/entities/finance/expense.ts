import {BaseEntity} from "../base-entity";
import {Customer} from "../customer";
import {PlaneTicket} from "../plane-ticket";
import {ProcedureApply, ProcedureApplyStep} from "../procedure-apply";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {Procedure} from "@entities/procedure";
import {User} from "@app/identity";
import {Space} from "@entities/space";
import {DateTime} from "luxon";

export class Expense extends BaseEntity<string> {
  amount: Money;
  reason: string = '';
  details: string = '';
  updatedAt: DateTime;

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

  expenseOwners: ExpenseOwner[]
  expenseElements: ExpenseElement[]
  expensePersons: ExpensePerson[]

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.code = value.code;
      this.updatedAt = value.updatedAt ? DateTime.fromISO(value.updatedAt) : null;
      this.amount = Money.parse(value.amount);

      this.reason = value.reason;
      this.details = value.details;

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

      this.expenseOwners = value.expenseOwners?.map(eo => new ExpenseOwner(eo));
      this.expenseElements = value.expenseElements?.map(eo => new ExpenseElement(eo));
      this.expensePersons = value.expensePersons?.map(eo => new ExpensePerson(eo));
    }
  }
}

export class ExpenseOwner {
  id: string;
  createdAt: Date;
  ownerId: string;

  expenseId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.ownerId = value.ownerId;
      this.expenseId = value.expenseId;
    }
  }
}


export class ExpenseElement {
  id: string;
  createdAt: Date;
  elementId: string;

  expenseId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.elementId = value.elementId;
      this.expenseId = value.expenseId;
    }
  }
}


export class ExpensePerson {
  id: string;
  createdAt: Date;
  personId: string;

  expenseId: string;
  kind: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.personId = value.personId;
      this.expenseId = value.expenseId;
      this.kind = value.kind;
    }
  }
}
