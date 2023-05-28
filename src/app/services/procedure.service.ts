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
  private stepUrl = `${SERVER_URL}/procedure-steps`;

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
    const call = this._httpClient.put<void>(`${this.url}/${procedure.id}/name`, {name});
    return firstValueFrom(call);
  }

  changeDescriptionAsync(procedure: Procedure, description: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${procedure.id}/description`, {description});
    return firstValueFrom(call);
  }

  getStepAsync(id: number): Promise<ProcedureStep> {
    const call = this._httpClient.get<ProcedureStep>(`${this.stepUrl}/${id}`);
    return firstValueFrom(call);
  }

  getStepsAsync(procedure: Procedure): Promise<ProcedureStep[]> {
    const procedureId = procedure.id;
    const call = this._httpClient.get<ProcedureStep[]>(`${this.stepUrl}`, {params: {procedureId}});
    return firstValueFrom(call);
  }

  addStepAsync(procedure: Procedure, model: ProcedureStepFormModel): Promise<ProcedureStep> {
    const procedureId = procedure.id;
    const call = this._httpClient.post<ProcedureStep>(`${this.stepUrl}`,model, {params: {procedureId}});
    return firstValueFrom(call);
  }

  changeStepNameAsync(procedureStep: ProcedureStep, name: string): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put<void>(`${this.stepUrl}/${procedureStepId}/name`,{name});
    return firstValueFrom(call);
  }

  changeStepDescriptionAsync(procedureStep: ProcedureStep, description: string): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put<void>(`${this.stepUrl}/${procedureStepId}/description`,{description});
    return firstValueFrom(call);
  }


  async changeStepPriceAsync(procedureStep: ProcedureStep, price: number): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put<void>(`${this.stepUrl}/${procedureStepId}/price`,{price});
    await firstValueFrom(call);
    procedureStep.price = price;
  }

  async changeStepIndexAsync(procedureStep: ProcedureStep, index: number): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.put(`${this.stepUrl}/${procedureStepId}/index`,{index});
    await firstValueFrom(call);
  }

  async deleteStepAsync(procedureStep: ProcedureStep): Promise<void> {
    const procedureStepId = procedureStep.id;
    const call = this._httpClient.delete(`${this.stepUrl}/${procedureStepId}`);
    await firstValueFrom(call);
  }

  async deleteAsync(procedure: Procedure): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${procedure.id}`);
    await firstValueFrom(call);
  }
}
