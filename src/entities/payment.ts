import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {PlaneTicket} from "./plane-ticket";
import {ProcedureApplyStep} from "./procedure-apply";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";

export class Payment extends BaseEntity<number> {
  amount: number = 0;
  reason: string = '';
  customer: Customer;
  customerId: number;

  planeTicket: PlaneTicket;
  planeTicketId: number;

  procedureApplyStep: ProcedureApplyStep;
  procedureApplyStepId: number;

  agency:Agency;
  agencyId: number;

  employee: Employee;
  employeeId: number;

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.amount = value.amount;
      this.reason = value.reason;

      this.customerId = value.customerId;
      this.planeTicketId = value.planeTicketId;
      this.procedureApplyStepId = value.procedureApplyStepId;

      this.customer = value.customer ? new Customer(value.customer) : null;
      this.planeTicket = value.planeTicket ? new PlaneTicket(value.planeTicket) : null;
      this.procedureApplyStep = value.procedureApplyStep ? new ProcedureApplyStep(value.procedureApplyStep) : null;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : undefined;
    }
  }
}

