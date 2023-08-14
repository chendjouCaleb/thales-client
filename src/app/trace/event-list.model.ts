import {Payment} from "@entities/payment";
import {Event} from './models/event';
import {User} from "@app/identity";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Customer} from "@entities/customer";
import {PlaneTicket} from "@entities/plane-ticket";
import {ProcedureApply} from "@entities/procedure-apply";
import {Procedure} from "@entities/procedure";

export class EventListModel {
  events: Event[];
  users: User[];
  agencies: Agency[];
  employees: Employee[];
  procedures: Procedure[];
  customers: Customer[];
  payments: Payment[];
  planeTickets: PlaneTicket[];
  procedureApplies: ProcedureApply[];


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

    this.events.forEach(e => e.model = this)
  }
}
