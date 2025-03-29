import {Component, ViewEncapsulation} from "@angular/core";
import { IconButton} from "@app/ui";
import {ImagePlus, LucideAngularModule, XIcon} from "lucide-angular";
import {UserPhotoEdit} from "@app/identity";
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
    MyPersonaText
  ],
  host: {
    class: 'user-photo-edit-home'
  }
})
export class UserPhotoEditHome {
  icons = { XIcon, ImagePlus }

  constructor(public readonly parent: UserPhotoEdit,
              private _navHost: NavHost,) {}

  next() {
    this._navHost.navigateByUrl('upload')
  }
}
