import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {AuthData, LoginModel, LoginResult, Session} from "./models";
import {firstValueFrom, Observable, ReplaySubject, Subject} from "rxjs";
import {deleteCookie, getCookie, setCookie} from "@app/utils";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url = `${SERVER_URL}/authentication`;
  private _stateChange = new ReplaySubject<boolean>();
  get stateChange(): Observable<boolean> {return this._stateChange.asObservable(); }

  private _session: Session = null;
  private _accessToken: string = '';
  private _initialized = false;
  get accessToken(): string {
    return this._accessToken;
  }

  get isLogged(): boolean { return !!this._session; }
  get session(): Session {
    if(!this.isLogged) {
      throw new Error("Not Authenticated.")
    }
    return new Session(this._session);
  }


  constructor(private _httpClient: HttpClient) {}

  public async init() {
    const accessToken = this.getAuthData().accessToken

    if(!accessToken) {
      this._stateChange.next(false);
      this._initialized = true;
      console.log('You are logout.')
      return
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    try {
      const call = this._httpClient.get<any>(`${this.url}/session`, {headers});
      const session = new Session(await firstValueFrom(call));

      this._accessToken = accessToken;
      this._session = session;
      this._initialized = true;
      this._stateChange.next(true);
      console.log(`${session.user.fullName} is logged.`)
    }catch (e) {
      if(e.error.errorCode === 'SessionNotFound') {
        this.clearData();
        this._stateChange.next(false);
      }
    }

  }

  public async isLoggedAsync(): Promise<boolean> {
    if(this._initialized) {
      return this.isLogged;
    }
    return firstValueFrom(this._stateChange.asObservable());
  }

  public async loginAsync(model: LoginModel): Promise<Session> {
    const call = this._httpClient.post<LoginResult>(`${this.url}/login`, model);
    const result =  new LoginResult(await firstValueFrom(call));

    this._session = result.session;
    this._accessToken = result.jwtToken;
    this._stateChange.next(this.isLogged);
    this.saveAuthData(result.data())


    return result.session;
  }

  public async getSession(): Promise<Session> {
    const call = this._httpClient.get<any>(`${this.url}/session`);
    return new Session(await firstValueFrom(call));
  }


  public async logoutAsync(): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/logout`, {});
    await firstValueFrom(call);
    this.clearData();

    this._stateChange.next(false);
  }

  private clearData() {
    this.clearAuthData();
    this._session = null;
    this._accessToken = null
  }

  private saveAuthData1(data: AuthData) {
    localStorage.setItem("AUTH_ACCESS_TOKEN", data.accessToken);
    localStorage.setItem("AUTH_SESSION_ID", data.sessionId);
  }

  private saveAuthData(data: AuthData) {
    setCookie("AUTH_ACCESS_TOKEN", data.accessToken, {path: '/', domain: environment.cookieDomain });
    setCookie("AUTH_SESSION_ID", data.sessionId, {path: '/', domain: environment.cookieDomain });
  }

  private getAuthData1(): AuthData {
    const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");
    return {
      accessToken,
      sessionId: '',
      refreshToken: ''
    }
  }
  private getAuthData(): AuthData {
    const accessToken = getCookie("AUTH_ACCESS_TOKEN");
    return {
      accessToken,
      sessionId: '',
      refreshToken: ''
    }
  }


  private clearAuthData1() {
    localStorage.removeItem("AUTH_ACCESS_TOKEN");
    localStorage.removeItem("AUTH_SESSION_ID");
  }

  private clearAuthData() {
    deleteCookie("AUTH_ACCESS_TOKEN");
    deleteCookie("AUTH_SESSION_ID");
  }
}
