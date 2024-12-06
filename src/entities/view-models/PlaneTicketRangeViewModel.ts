import {Payment} from "@entities/payment";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {PlaneTicket} from "@entities/plane-ticket";
import {Customer} from "@entities/customer";
import {User} from "@app/identity";

export class PlaneTicketRangeViewModel {
  payments: Payment[];
  agencies: Agency[];
  employees: Employee[]
  users: User[]
  customers: Customer[]
  planeTickets: PlaneTicket[]

  total: number

  constructor(value: any = {}) {
    if (value) {
      this.payments = value.payments.map(p => new Payment(p));
      this.agencies = value.agencies.map(p => new Agency(p));
      this.employees = value.employees.map(p => new Employee(p));
      this.users = value.users.map(p => new User(p));
      this.customers = value.customers?.map(p => new Customer(p));
      this.planeTickets = value.planeTickets.map(p => new PlaneTicket(p));
      this.total = value.total
    }
  }

  hydrate() {
    this.planeTickets.forEach(payment => {
      payment.customer = this.customers.find(c => c.id == payment.customerId);
      payment.employee = this.employees.find(c => c.id == payment.employeeId);
      payment.agency = this.agencies.find(c => c.id == payment.agencyId);

    });
  }
}
