import {Component, Input, ViewEncapsulation} from "@angular/core";
import {AuthenticationService, PhotoEditTrigger, Session, UserPersona} from "@app/identity";
import {
  CircleUserIcon,
  LogOutIcon,
  LucideAngularModule,
  MenuIcon,
  PlusIcon,
  UserCogIcon,
  UserIcon
} from "lucide-angular";
import {NgIf} from "@angular/common";
import {Button, IconButton, Menu, MenuItem} from "@app/ui";
import {RouterLink} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";
import {Dropdown} from "@app/NeoUI";
import {SpaceAddLauncher} from "@app/Components/space/add/space-add-launcher";
import {MyPersonaText, Persona, Tooltip} from "neo-ui";

@Component({
  templateUrl: 'scaffold-toolbar.html',
  selector: 'scaffold-toolbar',
  styleUrls: [ 'scaffold-toolbar.scss' ],
  standalone: true,
  imports: [LucideAngularModule, NgIf, IconButton, RouterLink, MatTooltip, Button, Dropdown, Menu, MenuItem, PhotoEditTrigger, Persona, MyPersonaText, Tooltip, UserPersona],
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
