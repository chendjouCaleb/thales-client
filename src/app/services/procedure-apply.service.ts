import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Agency, Customer, Payment, Procedure, ProcedureApply, ProcedureApplyStep, ProcedureStep} from "../../entities";
import {SERVER_URL} from "../http/http-config";
import {firstValueFrom} from "rxjs";
import {ProcedureApplyStepValidateModel, ProcedureStepFormModel} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ProcedureApplyService {
  private url = `${SERVER_URL}/procedure-applies`;
  private stepUrl = `${SERVER_URL}/procedure-apply-steps`;

  constructor(private _httpClient: HttpClient) {}

  async listByCustomerAsync(customer: Customer): Promise<ProcedureApply[]> {
    const customerId = customer.id.toString();
      const call = this._httpClient.get<ProcedureApply[]>(`${this.url}`, {params: {customerId}});
      const items = await firstValueFrom(call);
      return items;
  }

  async listByProcedureAsync(procedure: Procedure): Promise<ProcedureApply[]> {
    const procedureId = procedure.id;
    const call = this._httpClient.get<ProcedureApply[]>(`${this.url}`, {params: {procedureId}});
    const items = await firstValueFrom(call);
    return items;
  }

  async listAsync(params: any): Promise<ProcedureApply[]> {
    const call = this._httpClient.get<ProcedureApply[]>(`${this.url}`, {params});
    const items = await firstValueFrom(call);
    return items.map(p => new ProcedureApply(p));
  }

  async getByIdAsync(id: number): Promise<ProcedureApply> {
    const call = this._httpClient.get<ProcedureApply>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new ProcedureApply(value);
  }

  async addAsync(agency: Agency, customer: Customer, procedure: Procedure): Promise<ProcedureApply> {
    const params = {customerId: customer.id, procedureId: procedure.id, agencyId: agency.id};
    const call = this._httpClient.post<Procedure>(`${this.url}`, {}, {params});
    return new ProcedureApply(await firstValueFrom(call));
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

  async validateStepAsync(applyStep: ProcedureApplyStep, model: ProcedureApplyStepValidateModel): Promise<Payment> {
    const call = this._httpClient.put<Payment>(`${this.stepUrl}/${applyStep.id}/validate`, model);
    const payment = new Payment(await firstValueFrom(call));
    applyStep.validated = true;
    applyStep.payments.unshift(payment);

    return payment;
  }

  invalidateStepAsync(procedureApplyStep: ProcedureApplyStep): Promise<void> {
    const call = this._httpClient.put<void>(`${this.stepUrl}/${procedureApplyStep.id}/invalidate`, {});
    return firstValueFrom(call);
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
}
