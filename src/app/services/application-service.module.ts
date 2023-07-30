import {NgModule} from "@angular/core";
import {ApplicationHttpModule} from "../http";
import {CustomerService} from "./customer.service";
import {ProcedureService} from "./procedure.service";
import {ProcedureApplyService} from "./procedure-apply.service";
import {PaymentService} from "./payment.service";
import {PlaneTicketService} from "./plane-ticket.service";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";

@NgModule({
  imports : [ ApplicationHttpModule ],
  providers: [ CustomerService, ProcedureService, ProcedureApplyService, PaymentService, PlaneTicketService,
  AgencyHttpClient, EmployeeHttpClient ]
})
export class ApplicationServiceModule {}
