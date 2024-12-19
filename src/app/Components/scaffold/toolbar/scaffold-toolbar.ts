import {Component, Input, ViewEncapsulation} from "@angular/core";
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
import {SpaceAddLauncher} from "@app/Components/space/add/space-add-launcher";

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


  @Input()
  showCreateButton = false;

  constructor(private _authenticationService: AuthenticationService,
              public readonly spaceAddLauncher: SpaceAddLauncher) {

  }

  get session(): Session {
    return this._authenticationService.session;
  }
}
