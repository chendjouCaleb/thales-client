import {Component} from "@angular/core";
import {AuthenticationService, User, UserService} from "@app/identity";
import {MatDialog} from "@angular/material/dialog";
import {ProfileChangeName} from "@app/pages/identity/profile/user-change-name/profile-change-name";

import {MatButton} from "@angular/material/button";
import { Scaffold } from "@app/Components/scaffold";

@Component({
  templateUrl: 'profile-home.page.html',
  selector: 'ProfileHomePage',
  imports: [
    Scaffold,
    MatButton
  ],
  standalone: true
})
export class ProfileHomePage {
  user: User

  constructor(private _authenticationService: AuthenticationService,
              private _userService: UserService,
              private _dialog: MatDialog) {
    this.user = _authenticationService.session.user;
  }


  changeName() {
    this._dialog.open(ProfileChangeName, {panelClass: 'dialog-panel', data: {user: this.user}})
  }
}
