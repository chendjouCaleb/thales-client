import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SERVER_URL} from "@app/http";
import {Agency} from "@entities/agency";
import {firstValueFrom} from "rxjs";
import {AgencyAddModel, AgencyChangeInfoModel} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class AgencyHttpClient {
  private url = `${SERVER_URL}/agencies`;

  constructor(private _httpClient: HttpClient) {}

  async listAsync(): Promise<Agency[]> {
    const call = this._httpClient.get<Agency[]>(`${this.url}`);
    const items = await firstValueFrom(call);
    return items.map(i => new Agency(i));
  }

  async getByIdAsync(id: number): Promise<Agency> {
    const call = this._httpClient.get<Agency>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new Agency(value);
  }

  containsNameAsync(name: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/name`, {params: {name}});
    return firstValueFrom(call);
  }

  async addAsync(model: AgencyAddModel): Promise<Agency> {
    const call = this._httpClient.post<Agency>(`${this.url}`, model);
    const value = await firstValueFrom(call);
    return new Agency(value);
  }

  changeNameAsync(agency: Agency, name: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${agency.id}/name`, {name});
    return firstValueFrom(call);
  }

  changeInfoAsync(agency: Agency, model: AgencyChangeInfoModel): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${agency.id}/info`, model);
    return firstValueFrom(call);
  }


  async deleteAsync(agency: Agency): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${agency.id}`);
    await firstValueFrom(call);
  }
}
