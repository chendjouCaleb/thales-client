import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {PlaneTicket} from "./plane-ticket";
import {ProcedureApply, ProcedureApplyStep} from "./procedure-apply";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Money} from "@entities/money";
import {Member} from "@entities/member";
import {Procedure} from "@entities/procedure";
import {User} from "@app/identity";
import {Space} from "@entities/space";

export class Expense extends BaseEntity<number> {
  amount: Money;
  reason: string = '';
  details: string = '';
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
  userId: string

  constructor(value: any = {}) {
    super(value);
    if (value) {
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

      this.memberId = value.memberId;
      this.member = value.member ? new Member(value.member) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;
    }
  }
}

