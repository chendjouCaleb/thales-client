import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Agency,
  Customer, Debt, Expense,
  Income,
  Payment,
  Procedure,
  ProcedureApply,
  ProcedureApplyStep,
  ProcedureStep
} from "../../entities";
import {SERVER_URL} from "@app/http";
import {firstValueFrom} from "rxjs";
import {
  DebtAddModel,
  ExpenseAddModel,
  IncomeAddModel,
  ProcedureApplyStepValidateModel,
  ProcedureStepFormModel
} from "../models";
import {ProcedureApplyRangeViewModel} from "@entities/view-models/ProcedureApplyRangeViewModel";
import {DateTime} from "luxon";
import {Money} from "@entities/money";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyService {
  private url = `${SERVER_URL}/procedure-applies`;
  private stepUrl = `${SERVER_URL}/procedure-apply-steps`;

  constructor(private _httpClient: HttpClient) {}

  async listAsync(params: any): Promise<ProcedureApplyRangeViewModel> {
    const call = this._httpClient.get<ProcedureApply[]>(`${this.url}`, {params});
    const items = new ProcedureApplyRangeViewModel(await firstValueFrom(call));
    items.hydrate()

    return items;
  }

  async getByIdAsync(id: number): Promise<ProcedureApply> {
    const call = this._httpClient.get<ProcedureApply>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    const procedureApply = new ProcedureApply(value);
    procedureApply._hydrate()

    return procedureApply;
  }

  async addAsync(agency: Agency, customer: Customer, procedure: Procedure): Promise<ProcedureApply> {
    const params = {customerId: customer.id, procedureId: procedure.id, agencyId: agency.id};
    const call = this._httpClient.post<Procedure>(`${this.url}`, {}, {params});
    return new ProcedureApply(await firstValueFrom(call));
  }

  async lockAsync(apply: ProcedureApply): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${apply.id}/lock`, {});
    await firstValueFrom(call);
    apply.isLocked = true;
  }

  async unlockAsync(apply: ProcedureApply): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${apply.id}/unlock`, {});
    await firstValueFrom(call);
    apply.isLocked = false;
  }


  async doneAsync(apply: ProcedureApply): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${apply.id}/done`, {});
    await firstValueFrom(call);
    apply.doneAt = DateTime.now()
  }

  async undoneAsync(apply: ProcedureApply): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${apply.id}/undone`, {});
    await firstValueFrom(call);
    apply.doneAt = null
    apply.doneByMember = null
    apply.doneByMemberId = null
  }

  async getApplyStepByIdAsync(id: number): Promise<ProcedureApplyStep> {
    const call = this._httpClient.get<ProcedureApplyStep>(`${this.stepUrl}/${id}`);
    return new ProcedureApplyStep(await firstValueFrom(call));
  }

  async getApplyStepsAsync(procedureApply: ProcedureApply): Promise<ProcedureApplyStep[]> {
    const procedureApplyId = procedureApply.id;
    const call = this._httpClient.get<ProcedureApplyStep[]>(`${this.stepUrl}`,{params: {procedureApplyId}});
    const values = await firstValueFrom(call);
    return values.map(v => new ProcedureApplyStep(v));
  }

  getStepAsync(id: number): Promise<ProcedureStep> {
    const call = this._httpClient.get<ProcedureStep>(`${this.url}/steps/${id}`);
    return firstValueFrom(call);
  }

  getStepsAsync(procedure: Procedure): Promise<ProcedureStep[]> {
    const procedureId = procedure.id;
    const call = this._httpClient.get<ProcedureStep[]>(`${this.url}/steps`, {params: {procedureId}});
    return firstValueFrom(call);
  }

  addStepApplyAsync(procedure: Procedure, model: ProcedureStepFormModel): Promise<ProcedureStep> {
    const procedureId = procedure.id;
    const call = this._httpClient.post<ProcedureStep>(`${this.url}/steps`,model, {params: {procedureId}});
    return firstValueFrom(call);
  }

  async validateStepAsync(applyStep: ProcedureApplyStep): Promise<void> {
    const call = this._httpClient.put<void>(`${this.stepUrl}/${applyStep.id}/validate`, {});
    await firstValueFrom(call)
    applyStep.validated = true;
    applyStep.validatedAt = DateTime.now()
  }

  invalidateStepAsync(applyStep: ProcedureApplyStep): Promise<void> {
    const call = this._httpClient.put<void>(`${this.stepUrl}/${applyStep.id}/invalidate`, {});
    applyStep.validated = false;
    applyStep.validatedAt = null;
    return firstValueFrom(call);
  }

  async changePriceAsync(procedureApplyStep: ProcedureApplyStep, price: Money): Promise<void> {
    const call = this._httpClient.put<string>(`${this.stepUrl}/${procedureApplyStep.id}/price`,
      {}, {params: {price: price.toString()}});
    await firstValueFrom(call)
    procedureApplyStep.price = price;
  }

  async addPaymentAsync(procedureApplyStep: ProcedureApplyStep, amount: number): Promise<Payment> {
    const call = this._httpClient.post<Payment>(`${this.stepUrl}/${procedureApplyStep.id}/payment`, {}, {params: {amount}});
    const payment = new Payment(await firstValueFrom(call));
    procedureApplyStep.payments.unshift(payment);
    return payment;
  }

  deletePaymentAsync(procedureApplyStep: ProcedureApplyStep, payment: Payment): Promise<Payment> {
    const params = {paymentId: payment.id};

    const call = this._httpClient.put<Payment>(`${this.stepUrl}/${procedureApplyStep.id}/payment`, {}, {params});
    return firstValueFrom(call);
  }

  async deleteStepAsync(procedureStep: ProcedureStep): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.delete(`${this.url}/steps/${procedureStepId}/index`);
    await firstValueFrom(call);
  }

  async addIncomeAsync(procedureApplyStep: ProcedureApplyStep, model: IncomeAddModel): Promise<Income> {
    const call = this._httpClient.post<Income>(`${this.stepUrl}/${procedureApplyStep.id}/incomes`,
      model);
    const income = new Income(await firstValueFrom(call));
    procedureApplyStep.addIncome(income);
    procedureApplyStep.procedureApply?.addIncome(income)
    return income;
  }

  async addDebtAsync(procedureApplyStep: ProcedureApplyStep, model: DebtAddModel): Promise<Debt> {
    const call = this._httpClient.post<Debt>(`${this.stepUrl}/${procedureApplyStep.id}/debts`, model);
    const debt = new Debt(await firstValueFrom(call));
    procedureApplyStep.debts.unshift(debt);
    procedureApplyStep?.procedureApply.addDebt(debt);
    return debt;
  }

  async addExpenseAsync(procedureApplyStep: ProcedureApplyStep, model: ExpenseAddModel): Promise<Expense> {
    const call = this._httpClient.post<Expense>(`${this.stepUrl}/${procedureApplyStep.id}/expenses`, model);
    const expense = new Expense(await firstValueFrom(call));
    procedureApplyStep.expenses.unshift(expense);
    procedureApplyStep?.procedureApply.addExpense(expense)
    return expense;
  }
}
