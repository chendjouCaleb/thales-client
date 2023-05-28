import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Customer, Payment, Procedure, ProcedureApply, ProcedureApplyStep, ProcedureStep} from "../../entities";
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

  getByIdAsync(id: number): Promise<ProcedureApply> {
    const call = this._httpClient.get<ProcedureApply>(`${this.url}/${id}`);
    return firstValueFrom(call);
  }

  addAsync(customer: Customer, procedure: Procedure): Promise<Procedure> {
    const params = {customerId: customer.id, procedureId: procedure.id};
    const call = this._httpClient.post<Procedure>(`${this.url}`, {}, {params});
    return firstValueFrom(call);
  }

  getApplyStepByIdAsync(id: number): Promise<ProcedureApplyStep> {
    const call = this._httpClient.get<ProcedureApplyStep>(`${this.stepUrl}/${id}`);
    return firstValueFrom(call);
  }

  getApplyStepsAsync(procedureApply: ProcedureApply): Promise<ProcedureApplyStep> {
    const procedureApplyId = procedureApply.id;
    const call = this._httpClient.get<ProcedureApplyStep>(`${this.stepUrl}`,{params: {procedureApplyId}});
    return firstValueFrom(call);
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

  validateStepAsync(procedureApplyStep: ProcedureApplyStep, model: ProcedureApplyStepValidateModel): Promise<Payment> {
    const call = this._httpClient.put<Payment>(`${this.stepUrl}/${procedureApplyStep.id}/validate`, model);
    return firstValueFrom(call);
  }

  invalidateStepAsync(procedureApplyStep: ProcedureApplyStep): Promise<void> {
    const call = this._httpClient.put<void>(`${this.stepUrl}/${procedureApplyStep.id}/invalidate`, {});
    return firstValueFrom(call);
  }

  addPaymentAsync(procedureApplyStep: ProcedureApplyStep, amount: number): Promise<Payment> {
    const call = this._httpClient.put<Payment>(`${this.stepUrl}/${procedureApplyStep.id}/payment`, {}, {params: {amount}});
    return firstValueFrom(call);
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
