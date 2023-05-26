import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Procedure, ProcedureStep} from "../../entities";
import {SERVER_URL} from "../http/http-config";
import {firstValueFrom} from "rxjs";
import {ProcedureFormModel, ProcedureStepFormModel} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  private url = `${SERVER_URL}/procedures`;

  constructor(private _httpClient: HttpClient) {
  }

  async listAsync(): Promise<Procedure[]> {
      const call = this._httpClient.get<Procedure[]>(`${this.url}`);
      const items = await firstValueFrom(call);

      // items.forEach(item => {
      //   item.price = item.steps.map(p => p.price).reduce((pv, cv) => pv + cv);
      // });

      return items;
  }

  getByIdAsync(id: number): Promise<Procedure> {
    const call = this._httpClient.get<Procedure>(`${this.url}/${id}`);
    return firstValueFrom(call);
  }

  addAsync(model: ProcedureFormModel): Promise<Procedure> {
    const call = this._httpClient.post<Procedure>(`${this.url}`, model);
    return firstValueFrom(call);
  }

  changeNameAsync(procedure: Procedure, name: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${procedure.id}`, {}, {params: {name}});
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

  addStepAsync(procedure: Procedure, model: ProcedureStepFormModel): Promise<ProcedureStep> {
    const procedureId = procedure.id;
    const call = this._httpClient.post<ProcedureStep>(`${this.url}/steps`,model, {params: {procedureId}});
    return firstValueFrom(call);
  }

  changeStepNameAsync(procedureStep: ProcedureStep, name: string): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put<void>(`${this.url}/steps/${procedureStepId}/name`,{}, {params: {name}});
    return firstValueFrom(call);
  }


  changeStepPriceAsync(procedureStep: ProcedureStep, price: number): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put<void>(`${this.url}/steps/${procedureStepId}/price`,{}, {params: {price}});
    return firstValueFrom(call);
  }

  async changeStepIndexAsync(procedureStep: ProcedureStep, index: number): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put(`${this.url}/steps/${procedureStepId}/index`,{}, {params: {index}});
    await firstValueFrom(call);
  }

  async deleteStepAsync(procedureStep: ProcedureStep): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.delete(`${this.url}/steps/${procedureStepId}/index`);
    await firstValueFrom(call);
  }
}
