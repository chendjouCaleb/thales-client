import {Component, ViewEncapsulation} from "@angular/core";
import {AuthenticationService, Session} from "@app/identity";
import {
  LogOutIcon,
  LucideAngularModule,
  MenuIcon,
  UserIcon,
  CircleUserIcon,
  UserCogIcon,
  PlusIcon
} from "lucide-angular";
import {NgIf} from "@angular/common";
import {Button, IconButton, Menu, MenuItem} from "@app/ui";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {Dropdown} from "@app/NeoUI";
import {Scaffold} from "../scaffold";

@Component({
  templateUrl: 'scaffold-toolbar.html',
  selector: 'scaffold-toolbar',
  styleUrls: [ 'scaffold-toolbar.scss' ],
  standalone: true,
  imports: [LucideAngularModule, NgIf, IconButton, RouterLink, MatTooltip, Button, Dropdown, Menu, MenuItem],
  encapsulation: ViewEncapsulation.None
})
export class ScaffoldToolbar {
  icons = {LogOutIcon, MenuIcon, UserIcon, CircleUserIcon, UserCogIcon, PlusIcon }
  constructor(private _authenticationService: AuthenticationService,
              public scaffold: Scaffold) {

  }

  get session(): Session {
    return this._authenticationService.session;
  }
}
