import {BaseEntity} from "../base-entity";
import {Customer} from "../customer";
import {PlaneTicket} from "../plane-ticket";
import {ProcedureApply } from "../procedure-apply";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {Procedure} from "@entities/procedure";
import {User} from "@app/identity";
import {Space} from "@entities/space";
import {DateTime} from "luxon";

export class Income extends BaseEntity<string> {
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

  incomeOwners: IncomeOwner[]
  incomeElements: IncomeElement[]
  incomePersons: IncomePerson[]

  constructor(value: any = {}) {
    super(value);
    if (value) {

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


      console.log('Persons: ', value.IncomePersons)
      this.incomeOwners = value.incomeOwners?.map(eo => new IncomeOwner(eo));
      this.incomeElements = value.incomeElements?.map(eo => new IncomeElement(eo));
      this.incomePersons = value.incomePersons?.map(eo => new IncomePerson(eo));
    }
  }
}

export class IncomeOwner {
  id: string;
  createdAt: Date;
  ownerId: string;

  IncomeId: string;
  kind: string

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.ownerId = value.ownerId;
      this.IncomeId = value.IncomeId;
      this.kind = value.kind;
    }
  }
}


export class IncomeElement {
  id: string;
  createdAt: Date;
  elementId: string;

  IncomeId: string;
  kind: string

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.elementId = value.elementId;
      this.IncomeId = value.IncomeId;
      this.kind = value.kind;
    }
  }
}


export class IncomePerson {
  id: string;
  createdAt: Date;
  personId: string;

  IncomeId: string;

  kind: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.personId = value.personId;
      this.IncomeId = value.IncomeId;
      this.kind = value.kind;
    }
  }
}
