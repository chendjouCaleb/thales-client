import {NgModule} from "@angular/core";
import {ApplicationHttpModule} from "../http";
import {CustomerService} from "./customer.service";
import {ProcedureService} from "./procedure.service";
import {ProcedureApplyService} from "./procedure-apply.service";

@NgModule({
  imports : [ ApplicationHttpModule ],
  providers: [ CustomerService, ProcedureService, ProcedureApplyService ]
})
export class ApplicationServiceModule {}
