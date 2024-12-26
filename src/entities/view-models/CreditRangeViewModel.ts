import {Credit} from "@entities/finance/credit";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {PlaneTicket} from "@entities/plane-ticket";
import {Customer} from "@entities/customer";
import {Member} from "@entities/member";
import {User} from "@app/identity";

export class CreditRangeViewModel {
  credits: Credit[];
  agencies: Agency[];
  employees: Employee[];
  members: Member[];
  users: User[];
  customers: Customer[]
  procedures: Procedure[]
  procedureSteps: ProcedureStep[]
  procedureApplies: ProcedureApply[]
  procedureApplySteps: ProcedureApplyStep[]
  planeTickets: PlaneTicket[]

  total: number

  constructor(value: any = {}) {
    if (value) {
      this.credits = value.credits.map(p => new Credit(p));
      this.agencies = value.agencies?.map(p => new Agency(p));
      this.employees = value.employees?.map(p => new Employee(p));
      this.members = value.members?.map(p => new Member(p));
      this.users = value.users?.map(p => new User(p));
      this.customers = value.customers?.map(p => new Customer(p));
      this.procedures = value.procedures?.map(p => new Procedure(p));
      this.procedureSteps = value.procedureSteps?.map(p => new ProcedureStep(p));
      this.procedureApplies = value.procedureApplies?.map(p => new ProcedureApply(p));
      this.procedureApplySteps = value.procedureApplySteps?.map(p => new ProcedureApplyStep(p));
      this.planeTickets = value.planeTickets?.map(p => new PlaneTicket(p));
      this.total = value.total
    }
  }

  hydrate() {

    this.members.forEach(member => {
      member.user = this.users.find(u => u.id == member.userId);
    });

    this.employees.forEach(employee => {
      employee.user = this.users.find(u => u.id == employee.userId);
    });

    this.credits.forEach(credit => {
      credit.creditPersons.forEach(ep => {
        const member = this.members.find(m => m.personId == ep.personId)
        if (member != null) {
          credit.member = member;
        }
      });

      console.log(this.employees)
      credit.creditPersons.forEach(ep => {
        const employee = this.employees.find(m => m.personId == ep.personId)
        if (employee != null) {
          credit.employee = employee;
        }
      });


      credit.creditOwners.forEach(eo => {
        const agency = this.agencies.find(a => a.ownerId == eo.ownerId);
        if (agency != null) {
          credit.agency = agency;
        }
      });

    });
  }
}
