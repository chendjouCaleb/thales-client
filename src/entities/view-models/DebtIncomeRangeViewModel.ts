import {Employee} from "@entities/employee";
import {Member} from "@entities/member";
import {User} from "@app/identity";
import {DebtIncome} from "@entities/finance/debt-income";
import {Income} from "@entities/finance";

export class DebtIncomeRangeViewModel {
  debtIncomes: DebtIncome[];
  employees: Employee[];
  members: Member[];
  users: User[];

  get incomes(): Income [] {
    return this.debtIncomes.map(di => di.income)
  }


  total: number

  constructor(value: any = {}) {
    if (value) {
      this.debtIncomes = value.debtIncomes.map(p => new DebtIncome(p));
      this.employees = value.employees?.map(p => new Employee(p));
      this.members = value.members?.map(p => new Member(p));
      this.users = value.users?.map(p => new User(p));
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

    this.incomes.forEach(income => {
      income.incomePersons.forEach(ep => {
        const member = this.members.find(m => m.personId == ep.personId)
        if (member != null) {
          income.member = member;
        }
      });

      console.log(this.employees)
      income.incomePersons.forEach(ep => {
        const employee = this.employees.find(m => m.personId == ep.personId)
        if (employee != null) {
          income.employee = employee;
        }
      });

    });

  }
}
