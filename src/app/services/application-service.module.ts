import {NgModule} from "@angular/core";
import {ApplicationHttpModule} from "../http";
import {CustomerService} from "./customer.service";
import {ProcedureService} from "./procedure.service";
import {ProcedureApplyService} from "./procedure-apply.service";
import {PaymentService} from "./payment.service";
import {PlaneTicketService} from "./plane-ticket.service";
import {AgencyService} from "@app/services/agency.service";
import {EmployeeService} from "@app/services/employee.service";

@NgModule({
  imports : [ ApplicationHttpModule ],
  providers: [ CustomerService, ProcedureService, ProcedureApplyService, PaymentService, PlaneTicketService,
  AgencyService, EmployeeService ]
})
export class ApplicationServiceModule {}
