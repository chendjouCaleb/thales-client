import {Component, ViewEncapsulation} from "@angular/core";
import { IconButton} from "@app/ui";
import {ImagePlus, LucideAngularModule, PencilIcon, Trash2Icon, XIcon} from "lucide-angular";
import {AuthenticationService, User,  UserPhotoEdit} from "@app/identity";
import { UserPersona } from '../../../persona'
import {Button, MyPersonaText, Persona} from "neo-ui";
import {NavHost} from "@app/navigation";

@Component({
  templateUrl: 'user-photo-edit-home.html',
  selector: '[user-photo-edit-home]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    IconButton,
    LucideAngularModule,
    Button,
    Button,
    Button,
    Persona,
    MyPersonaText,
    UserPersona
  ],
  host: {
    class: 'user-photo-edit-home'
  }
})
export class UserPhotoEditHome {
  icons = { XIcon, ImagePlus, PencilIcon, Trash2Icon }

  get user(): User { return this._userService.session.user; }

  constructor(public readonly parent: UserPhotoEdit,
              private _userService: AuthenticationService,
              private _navHost: NavHost,) {}

  next() {
    this._navHost.navigateByUrl('upload')
  }
}
