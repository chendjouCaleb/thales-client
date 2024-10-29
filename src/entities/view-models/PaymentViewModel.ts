import {Money} from "@entities/money";
import {BaseEntity} from "@entities/base-entity";
import {ProcedureApplyStepViewModel} from "./procedure-apply-step.viewModel";
import {Payment} from "@entities/payment";

export class PaymentViewModel extends BaseEntity<number>{
  amount: Money;
  reason: string = '';

  customerName: string;
  customerId: number;

  planeTicketId: number;

  procedureApplyStep: ProcedureApplyStepViewModel;
  procedureApplyStepId: number;

  agencyName: string;
  agencyId: number;

  employeeName: string;
  employeeId: number;

  constructor(value: any = {}) {
    super(value);
    if (value) {
      if(value.amount instanceof Money){
        this.amount = value.amount;
      }else {
        this.amount = Money.parse(value.amount);
      }
      this.reason = value.reason;


      this.planeTicketId = value.planeTicketId;
      this.procedureApplyStepId = value.procedureApplyStepId;

      this.customerName = value.customerName;
      this.customerId = value.customerId;
      //this.planeTicket = value.planeTicket ? new PlaneTicket(value.planeTicket) : null;
      this.procedureApplyStep = value.procedureApplyStep ? new ProcedureApplyStepViewModel(value.procedureApplyStep) : null;

      this.agencyId = value.agencyId;
      this.agencyName = value.agencyName;

      this.employeeId = value.employeeId;
      this.employeeName = value.employeeName;
    }
  }

  static fromPayment(payment: Payment): PaymentViewModel {
    const viewModel = new PaymentViewModel(payment);
    viewModel.customerName = payment.customer.fullName;
    viewModel.agencyName = payment.agency?.name;
    viewModel.employeeName = payment.employee?.user?.fullName;

    if(payment.procedureApplyStep){
      viewModel.procedureApplyStep = ProcedureApplyStepViewModel.fromApply(payment.procedureApplyStep);
    }


    return viewModel;
  }
}
