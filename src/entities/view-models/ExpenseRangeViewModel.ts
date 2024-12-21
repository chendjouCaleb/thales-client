import {Expense} from "@entities/expense";
import {Agency} from "@entities/agency";
import {Employee} from "@entities/employee";
import {Procedure, ProcedureStep} from "@entities/procedure";
import {ProcedureApply, ProcedureApplyStep} from "@entities/procedure-apply";
import {PlaneTicket} from "@entities/plane-ticket";
import {Customer} from "@entities/customer";

export class ExpenseRangeViewModel {
  expenses: Expense[];
  agencies: Agency[];
  employees: Employee[]
  customers: Customer[]
  procedures: Procedure[]
  procedureSteps: ProcedureStep[]
  procedureApplies: ProcedureApply[]
  procedureApplySteps: ProcedureApplyStep[]
  planeTickets: PlaneTicket[]

  total: number

  constructor(value: any = {}) {
    if (value) {
      this.expenses = value.expenses.map(p => new Expense(p));
      this.agencies = value.agencies.map(p => new Agency(p));
      this.employees = value.employees.map(p => new Employee(p));
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
    this.expenses.forEach(expense => {
      expense.customer = this.customers.find(c => c.id == expense.customerId);
      expense.employee = this.employees.find(c => c.id == expense.employeeId);
      expense.agency = this.agencies.find(c => c.id == expense.agencyId);

      if(expense.planeTicketId) {
        expense.planeTicket = this.planeTickets.find(p => p.id == expense.planeTicketId);
      }

    });
  }
}
