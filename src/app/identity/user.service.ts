import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {HttpClient} from "@angular/common/http";
import {CheckPasswordModel, CheckResetPasswordModel, ResetPasswordModel, UserAddModel} from "./models/user.form-model";
import {firstValueFrom, Observable} from "rxjs";
import {User} from "./models";

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
    return new User(await firstValueFrom(call))
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

  public async containsAsync(id: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains?userId=${id}`);
    return firstValueFrom(call);
  }

  public async containsByIdAsync(id: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/id?id=${id}`);
    return firstValueFrom(call);
  }

  public async containsByEmailAsync(email: string): Promise<boolean> {
    const call = this._httpClient.get<boolean>(`${this.url}/contains/email?email=${email}`);
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

  public async resetPassword(model: ResetPasswordModel ): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/reset-password`, model);
    return firstValueFrom(call)
  }


  public async resetPasswordCode(userId: string): Promise<void> {
    const call = this._httpClient.post<void>(`${this.url}/reset-password-code?userId=${userId}`, {});
    return firstValueFrom(call)
  }

  public async checkResetPasswordCode(model: CheckResetPasswordModel): Promise<boolean> {
    const call = this._httpClient.post<boolean>(`${this.url}/check-reset-password-code`, model);
    return firstValueFrom(call)
  }

  public async checkPassword(model: CheckPasswordModel): Promise<boolean> {
    const call = this._httpClient.put<boolean>(`${this.url}/check-password`, model);
    return firstValueFrom(call);
  }
}
