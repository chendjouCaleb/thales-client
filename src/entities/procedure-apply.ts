import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {Procedure, ProcedureStep} from "./procedure";
import {Payment} from "./payment";

export class ProcedureApply extends BaseEntity<number> {
  customer: Customer;
  customerId: number;

  procedure: Procedure;
  procedureId: number;

  steps: ProcedureApplyStep[] = [];

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.customerId = value.customerId;
      if (value.customer) {
        this.customer = new Customer(value.customer);
      }

      this.procedureId = value.procedureId;
      if (value.procedure) {
        this.procedure = new Procedure(value.procedure);
      }
    }
  }
}


export class ProcedureApplyStep extends BaseEntity<number> {
  procedureApply: ProcedureApply;
  procedureApplyId: number;

  procedureStep: ProcedureStep
  procedureStepId: number;

  validated: boolean;
  paymentAmount: number = 0;

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


    }
  }
}
