import {Payment} from "@entities/payment";
import {Event} from './models/event';
import {User} from "@app/identity";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Customer} from "@entities/customer";
import {PlaneTicket} from "@entities/plane-ticket";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {Message} from "@entities/message";

export class EventListModel {
  events: Event[];
  users: User[];
  agencies: Agency[];
  employees: Employee[];
  customers: Customer[];
  payments: Payment[];
  planeTickets: PlaneTicket[];

  procedures: Procedure[];
  procedureSteps: ProcedureStep[];
  procedureApplySteps: ProcedureApplyStep[];
  procedureApplies: ProcedureApply[];

  messages: Message[] = [];



  fix() {
    this.employees.forEach(e => {
      e.agency = this.agencies.find(a => a.id == e.agencyId);
      e.user = this.users.find(u => u.id == e.userId);
    });

    this.payments.forEach(p => {
      p.agency = this.agencies.find(a => a.id == p.agencyId);
      p.customer = this.customers.find(c => c.id == p.customerId);
      p.employee = this.employees.find(e => e.id == p.employeeId);
    });

    this.planeTickets.forEach(pt => {
      pt.agency = this.agencies.find(a => a.id == pt.agencyId);
      pt.customer = this.customers.find(c => c.id == pt.customerId);
      pt.employee = this.employees.find(e => e.id == pt.employeeId);
    });

    this.procedureApplies.forEach(pt => {
      pt.agency = this.agencies.find(a => a.id == pt.agencyId);
      pt.customer = this.customers.find(c => c.id == pt.customerId);
      pt.employee = this.employees.find(e => e.id == pt.employeeId);
      pt.procedure = this.procedures.find(e => e.id == pt.procedureId);

    });

    this.procedureSteps.forEach(ps => {
      ps.procedure = this.procedures.find(p => p.id == ps.procedureId);
    });

    this.procedureApplySteps.forEach(pas => {
      pas.agency = this.agencies.find(a => a.id == pas.agencyId);
      pas.employee = this.employees.find(e => e.id == pas.employeeId);
      pas.procedureStep = this.procedureSteps.find(ps => ps.id == pas.procedureStepId);
      pas.procedureApply = this.procedureApplies.find(pa => pa.id == pas.procedureApplyId);

    });

    this.events.forEach(e => e.model = this)
  }
}
