import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService, Session} from "@app/identity";

@Component({
  templateUrl: 'scaffold-toolbar.html',
  selector: 'scaffold-toolbar',
  encapsulation: ViewEncapsulation.None
})
export class ScaffoldToolbar {
  constructor(private _authenticationService: AuthenticationService) {

  }

  get session(): Session {
    return this._authenticationService.session;
  }
}
