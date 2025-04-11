import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import { HttpClient } from "@angular/common/http";
import {firstValueFrom, Observable, Subject} from "rxjs";
import {ChangeInfoModel, UserChangePasswordModel} from "./models";
import {PhotoAddResult} from "@app/models";

@Injectable({providedIn: 'root'})
export class UserProfileService {
  private url = `${SERVER_URL}/profile`;
  private _photoChange = new Subject<PhotoAddResult>()
  get photoChange(): Observable<PhotoAddResult> { return this._photoChange }

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

  public async changePictureAsync(blob: Blob, fileName: string): Promise<PhotoAddResult> {
    const formData = new FormData()
    formData.append("photo", blob, fileName)
    const call = this._httpClient.put<PhotoAddResult>(`${this.url}/photo`, formData);
    const result = await firstValueFrom(call);
    this._photoChange.next(result);
    return result;
  }

  public async deletePictureAsync(): Promise<void> {
    const call = this._httpClient.delete<void>(`${this.url}/photo`);
    return firstValueFrom(call)
  }
}
