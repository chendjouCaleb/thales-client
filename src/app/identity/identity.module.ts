import {NgModule} from "@angular/core";
import {UserService} from "./user.service";
import {AuthenticationService} from "./authentication.service";
import {ProfileService} from "./profile.service";

@NgModule({
  providers: [ UserService, AuthenticationService, ProfileService ]
})
export class IdentityModule {}
