import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {ChangeInfoModel, UserChangePasswordModel} from "./models";

@Injectable({providedIn: 'root'})
export class ProfileService {
  private url = `${SERVER_URL}/profile`;

  constructor(private _httpClient: HttpClient) {}

  public async changeInfoAsync(model: ChangeInfoModel): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/info`, model);
    return firstValueFrom(call);
  }

  public async changePasswordAsync(model: UserChangePasswordModel): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/password`, model);
    return firstValueFrom(call);
  }

  public async changeUserNameAsync(userName: string): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/userName`, {userName});
    return firstValueFrom(call)
  }

  public async changeNameAsync(name: string): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/name`, {name});
    return firstValueFrom(call)
  }
}
