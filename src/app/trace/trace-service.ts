import {SERVER_URL} from "@app/http";
import {HttpClient} from "@angular/common/http";
import {EventListModel} from "@app/trace/event-list.model";
import {firstValueFrom} from "rxjs";
import {Event } from './models/event';

export class TraceService {
  private url = `${SERVER_URL}/events`;
  constructor(private _httpClient: HttpClient) {}


  async listAsync(publisherId: string): Promise<EventListModel> {
    const call = this._httpClient.get<any>(`${this.url}`, {params: {publisherId}});
    const value = await firstValueFrom(call);

    const model = new EventListModel();
    model.events = value.events.map(e => new Event(e));

    return model;
  }
}
