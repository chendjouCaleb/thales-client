import {BaseEntity} from "./base-entity";
import {Customer} from "./customer";
import {Procedure} from "./procedure";

export class ProcedureApply extends BaseEntity<number>  {
    customer: Customer;
    customerId: number;

    procedure: Procedure;
    procedureId: number;

    steps: ProcedureApplyStep[] = [];
}


export class ProcedureApplyStep extends BaseEntity<number> {
  procedureApply: ProcedureApply;
  procedureApplyId: number;

  procedureStep: ProcedureApply;
  procedureStepId: number;

  validated: number;
  paymentAmount: number = 0
}
