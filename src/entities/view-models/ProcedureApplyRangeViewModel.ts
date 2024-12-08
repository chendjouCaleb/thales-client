import {Payment} from "@entities/payment";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {Customer} from "@entities/customer";
import {User} from "@app/identity";
import {ProcedureApply} from "@entities/procedure-apply";

export class ProcedureApplyRangeViewModel {
  payments: Payment[];
  agencies: Agency[];
  employees: Employee[]
  users: User[]
  customers: Customer[]
  procedureApplies: ProcedureApply[]
  procedureSteps: ProcedureStep[]
  procedures: Procedure[]

  total: number

  constructor(value: any = {}) {
    if (value) {
      this.payments = value.payments?.map(p => new Payment(p));
      this.agencies = value.agencies?.map(p => new Agency(p));
      this.employees = value.employees.map(p => new Employee(p));
      this.users = value.users.map(p => new User(p));
      this.customers = value.customers?.map(p => new Customer(p));
      this.procedures = value.procedures.map(p => new Procedure(p));
      this.procedureSteps = value.procedureSteps.map(p => new ProcedureStep(p));
      this.procedureApplies = value.procedureApplies.map(p => new ProcedureApply(p));
      this.procedures = value.procedures.map(p => new Procedure(p));
      this.total = value.total
    }
  }

  hydrate() {
    this.procedureApplies.forEach(apply => {
      apply.customer = this.customers.find(c => c.id == apply.customerId);
      apply.employee = this.employees.find(c => c.id == apply.employeeId);
      apply.agency = this.agencies.find(c => c.id == apply.agencyId);
      apply.procedure = this.procedures.find(c => c.id == apply.procedureId);

      apply.steps.forEach(applyStep => {
        applyStep.procedureStep = this.procedureSteps.find(ps => ps.id == applyStep.procedureStepId)
      })
    });
  }
}
