import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {Procedure, ProcedureStep} from "./procedure";
import {Payment} from "./payment";
import {Agency} from "./agency";
import {Employee} from "@entities/employee";
import { Space } from "./space";
import {Money} from "@entities/money";

export class ProcedureApply extends BaseEntity<number> {
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

  steps: ProcedureApplyStep[] = [];

  totalPayment: Money

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.customerId = value.customerId;
      this.customer = value.customer ? new Customer(value.customer) : undefined;

      this.procedureId = value.procedureId;
      this.procedure = value.procedure ? new Procedure(value.procedure) : undefined;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : undefined;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.steps = value.steps ? value.steps.map(s => new ProcedureApply(s)) : undefined;

      this.totalPayment = value.totalPayment ? Money.parse(value.totalPayment) : undefined;
    }
  }
}


export class ProcedureApplyStep extends BaseEntity<number> {
  procedureApply: ProcedureApply;
  procedureApplyId: number;

  procedureStep: ProcedureStep
  procedureStepId: number;

  employee: Employee
  employeeId: number;

  agency: Agency;
  agencyId: number;

  validated: boolean;
  paymentAmount: number = 0;
  totalPayment: Money

  payments: Payment[] = []

  constructor(value: any = {}) {
    super(value);
    if (value) {

      this.procedureApplyId = value.procedureApplyId;
      this.procedureStepId = value.procedureStepId;

      this.procedureStep = value.procedureStep ? new ProcedureStep(value.procedureStep) : null;
      this.procedureApply = value.procedureApply ? new ProcedureApply(value.procedureApply) : null;
      this.payments = value.payments ? value.payments.map(p => new Payment(p)) : null;

      this.validated = value.validated;
      this.paymentAmount = value.paymentAmount;

      this.totalPayment = value.totalPayment ? Money.parse(value.totalPayment) : undefined;

      this.employeeId = value.employeeId;
      this.employee = value.employee ? new Employee(value.employee) : null;

      this.agencyId = value.agencyId;
      this.agency = value.agency ? new Agency(value.agency) : null;

    }
  }
}
