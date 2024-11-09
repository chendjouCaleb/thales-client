import {Injectable} from "@angular/core";

import {SERVER_URL} from "../http";
import {Message} from "../../entities";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, ReplaySubject} from "rxjs";
import {MessageCountModel} from "@app/models/message-count.model";

@Injectable({
  providedIn: 'root'
})
export class MessageHttpClient {
  private url = `${SERVER_URL}/messages`;
  messageCount: MessageCountModel
  messageCountChange = new ReplaySubject();

  constructor(private _httpClient: HttpClient) {}


  async listAsync(params: any = {}): Promise<Message[]> {
    const call = this._httpClient.get<Message[]>(`${this.url}`);
    const messages = await firstValueFrom(call);
    return messages.map(c => new Message(c));
  }

  async countAsync(): Promise<MessageCountModel> {
    const call = this._httpClient.get<any>(`${this.url}/count`);
    const result = await firstValueFrom(call);

    return result as MessageCountModel
  }

  async getAsync(id: number): Promise<Message> {
    const call = this._httpClient.get<Message>(`${this.url}/${id}`);
    return new Message(await firstValueFrom(call));
  }

  async deleteAsync(message: Message): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/${message.id}`);
    return await firstValueFrom(call);
  }
  async readAsync(message: Message): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/${message.id}/read`, {});
    return await firstValueFrom(call);
  }


}
