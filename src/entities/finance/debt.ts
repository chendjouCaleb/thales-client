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
import {DateTime, Duration} from "luxon";

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

  amountPaid: Money;

  elementId: string;

  get remaining(): Money {
    return this.amount.subtract(this.amountPaid)
  }

  get isPay() {
    return this.amountPaid.amount >= this.amount.amount;
  }

  get late(): Duration | null {
    if(!this.expireAt) {
      return null;
    }
    return DateTime.now().diff(this.expireAt)
  }

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.updatedAt = value.updatedAt ? DateTime.fromISO(value.updatedAt) : null;
      this.expireAt = value.expireAt ? DateTime.fromISO(value.expireAt) : null;
      this.doneAt = value.doneAt ? DateTime.fromISO(value.doneAt) : null;
      this.amount = Money.parse(value.amount);
      this.amountPaid = Money.parse(value.amountPaid);

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


      console.log('Persons: ', value.debtPersons)
      this.debtOwners = value.debtOwners?.map(eo => new DebtOwner(eo));
      this.debtElements = value.debtElements?.map(eo => new DebtElement(eo));
      this.debtPersons = value.debtPersons?.map(eo => new DebtPerson(eo));
    }
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

  debtId: string;

  constructor(value: any = {}) {
    if (value) {
      this.id = value.id;
      this.createdAt = value.createdAt;
      this.personId = value.personId;
      this.debtId = value.debtId;
    }
  }
}
