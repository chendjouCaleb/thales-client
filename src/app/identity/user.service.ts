import {Injectable} from "@angular/core";
import {CustomerHttp, SERVER_URL} from "../http";
import {HttpClient} from "@angular/common/http";
import {ChangeInfoModel, UserAddModel, UserChangePasswordModel} from "../models/forms/user.form-model";
import {firstValueFrom, Observable} from "rxjs";
import {User} from "../../entities";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${SERVER_URL}/users`;
  constructor( private _httpClient: HttpClient) {}

  public async listAsync(): Promise<User[]> {
    const call = this._httpClient.get<User[]>(`${this.url}`);
    return firstValueFrom(call);
  }

  public list(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.url}`);
  }

  public async getByIdAsync(id: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/get/id?id=${id}`);
    return firstValueFrom(call);
  }

  public async getByEmailAsync(email: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/get/email?email=${email}`);
    return firstValueFrom(call);
  }


  public async getByUserNameAsync(userName: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/get/userName?userName=${userName}`);
    return firstValueFrom(call);
  }

  public getByUserName(userName: string): Observable<User> {
   return this._httpClient.get<User>(`${this.url}/get/userName?userName=${userName}`);
  }


  public async containsByIdAsync(id: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/contains/id?id=${id}`);
    return firstValueFrom(call);
  }

  public async containsByEmailAsync(email: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/contains/email?email=${email}`);
    return firstValueFrom(call);
  }


  public async containsByUserNameAsync(userName: string): Promise<User> {
    const call = this._httpClient.get<User>(`${this.url}/contains/userName?userName=${userName}`);
    return firstValueFrom(call);
  }


  public async addAsync(model: UserAddModel): Promise<User> {
    const call = this._httpClient.post<User>(`${this.url}`, model);
    return firstValueFrom(call)
  }

  public async changeInfoAsync(user: User, model: ChangeInfoModel): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/${user.id}/info`, model);
    return firstValueFrom(call)
  }

  public async changePasswordAsync(user: User, model: UserChangePasswordModel): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/${user.id}/password`, model);
    return firstValueFrom(call)
  }

  public async changeUserNameAsync(user: User, userName: string): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/${user.id}/userName`, {userName});
    return firstValueFrom(call)
  }
}
