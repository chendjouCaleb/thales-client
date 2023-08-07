import {Injectable} from "@angular/core";
import {SERVER_URL} from "../http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginModel, LoginResult, Session} from "./models";
import {firstValueFrom, Observable, ReplaySubject, Subject} from "rxjs";

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


  constructor( private _httpClient: HttpClient) {}

  public async init() {
    const accessToken = localStorage.getItem("AUTH_ACCESS_TOKEN");

    if(!accessToken) {
      this._stateChange.next(false);
      this._initialized = true;
      console.log('You are logout.')
      return
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
    const call = this._httpClient.get<any>(`${this.url}/session`, {headers});
    const session = new Session(await firstValueFrom(call));

    this._accessToken = accessToken;
    this._session = session;
    this._initialized = true;
    this._stateChange.next(true);
    console.log(`${session.user.fullName} is logged.`)
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
    localStorage.setItem("AUTH_ACCESS_TOKEN", result.jwtToken);
    localStorage.setItem("AUTH_SESSION_ID", result.session.id);


    return result.session;
  }

  public async getSession(): Promise<Session> {
    const call = this._httpClient.get<any>(`${this.url}/session`);
    return new Session(await firstValueFrom(call));
  }


  public async logoutAsync(): Promise<void> {
    const call = this._httpClient.put<void>(`${this.url}/logout`, {});
    localStorage.removeItem("AUTH_ACCESS_TOKEN");
    localStorage.removeItem("AUTH_SESSION_ID");

    this._session = null;
    this._accessToken = null
    this._stateChange.next(false);

    return await firstValueFrom(call)
  }
}
