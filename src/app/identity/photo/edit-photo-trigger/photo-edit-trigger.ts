import {Component, ViewEncapsulation} from "@angular/core";
import {LucideAngularModule, PencilIcon} from "lucide-angular";
import {IconButton} from "@app/ui";
import {MyPersonaText, Persona} from "neo-ui";
import {UserPhotoEditLauncher} from "../edit/user-photo-edit.launcher";

@Component({
  templateUrl: 'photo-edit-trigger.html',
  styleUrl: 'photo-edit-trigger.scss',
  selector: 'photo-edit-trigger',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    LucideAngularModule,
    IconButton,
    Persona,
    MyPersonaText
  ],
  providers: [ UserPhotoEditLauncher ],
  host: {
    class: 'photo-edit-trigger'
  }
})
export class PhotoEditTrigger {
  icons = { PencilIcon }

  constructor(public readonly photoEditLauncher: UserPhotoEditLauncher) {
  }
}
