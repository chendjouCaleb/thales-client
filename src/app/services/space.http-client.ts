import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {SERVER_URL} from "@app/http";
import {Space} from "@entities/space";
import {firstValueFrom} from "rxjs";
import {SpaceAddModel} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class SpaceHttpClient {
  private url = `${SERVER_URL}/spaces`;

  constructor(private _httpClient: HttpClient) {}

  async listAsync(): Promise<Space[]> {
    const call = this._httpClient.get<Space[]>(`${this.url}`);
    const items = await firstValueFrom(call);
    return items.map(i => new Space(i));
  }

  async listMySpacesAsync(): Promise<Space[]> {
    const call = this._httpClient.get<Space[]>(`${this.url}/my-spaces`);
    const items = await firstValueFrom(call);
    return items.map(i => new Space(i));
  }

  async getByIdAsync(id: number): Promise<Space> {
    const call = this._httpClient.get<Space>(`${this.url}/${id}`);
    const value = await firstValueFrom(call);
    return new Space(value);
  }

  async getByIdentifierAsync(identifier: string): Promise<Space> {
    const call = this._httpClient.get<Space>(`${this.url}/find/${identifier}`);
    const value = await firstValueFrom(call);
    return new Space(value);
  }

  containsNameAsync(name: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/name`, {params: {name}});
    return firstValueFrom(call);
  }

  async addAsync(model: SpaceAddModel): Promise<Space> {
    const call = this._httpClient.post<Space>(`${this.url}`, model);
    const value = await firstValueFrom(call);
    return new Space(value);
  }

  changeNameAsync(space: Space, name: string): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${space.id}/name`, {name});
    return firstValueFrom(call);
  }


  async deleteAsync(Space: Space): Promise<void> {
    const call = this._httpClient.delete(`${this.url}/${Space.id}`);
    await firstValueFrom(call);
  }
}
