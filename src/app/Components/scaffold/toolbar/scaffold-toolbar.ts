import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService, Session} from "@app/identity";
import {Scaffold} from "@app/Components";

@Component({
  templateUrl: 'scaffold-toolbar.html',
  selector: 'scaffold-toolbar',
  encapsulation: ViewEncapsulation.None
})
export class ScaffoldToolbar {
  constructor(private _authenticationService: AuthenticationService,
              public scaffold: Scaffold) {

  }

  get session(): Session {
    return this._authenticationService.session;
  }
}
