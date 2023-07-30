import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "@app/identity";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthenticationService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this._auth.isLogged) {
      console.log("Authorization interceptor.");
      const AUTH_KEY = this._auth.accessToken;

      req = req.clone({setHeaders: { Authorization: `Bearer ${AUTH_KEY}`}})
    }

    return next.handle(req);
  }

}
