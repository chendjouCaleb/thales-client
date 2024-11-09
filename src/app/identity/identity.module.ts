import {NgModule} from "@angular/core";
import {UserService} from "./user.service";
import {AuthenticationService} from "./authentication.service";
import {ProfileService} from "./profile.service";
import {AuthorizationInterceptor} from "@app/identity/interceptors";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  providers: [ UserService, AuthenticationService, ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }
  ]
})
export class IdentityModule {}
