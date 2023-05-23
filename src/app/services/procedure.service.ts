import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Procedure} from "../../entities";
import {SERVER_URL} from "./http-config";
import {firstValueFrom} from "rxjs";
import {ProcedureFormModel} from "../models";

@Injectable({
  providedIn: 'root'
})
export class ProcedureHttp {
  private url = `${SERVER_URL}/procedures`;

  constructor(private _httpClient: HttpClient) {
  }

  listAsync(): Promise<Procedure[]> {
      const call = this._httpClient.get<Procedure[]>(`${this.url}`);
      return firstValueFrom(call)
  }

  getByIdAsync(id: number): Promise<Procedure> {
    const call = this._httpClient.get<Procedure>(`${this.url}/${id}`);
    return firstValueFrom(call)
  }

  addAsync(model: ProcedureFormModel): Promise<Procedure> {
    const call = this._httpClient.post<Procedure>(`${this.url}`, model);
    return firstValueFrom(call);
  }

  changeNameAsync(procedure: Procedure, name: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${procedure.id}`, {name});
    return firstValueFrom(call)
  }


}
