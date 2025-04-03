import {Component, ViewEncapsulation} from "@angular/core";
import {IconButton} from "@app/ui";
import {ArrowLeftIcon, ImagePlus, LaptopIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {UserPhotoEdit} from "@app/identity";
import {Button, MyPersonaText, Persona} from "neo-ui";
import {NavHost} from "@app/navigation";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserPhotoEditCropperLauncher} from "@app/identity/photo/edit/cropper";

@Component({
  templateUrl: 'user-photo-edit-confirm.html',
  selector: '[user-photo-edit-confirm]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [ UserPhotoEditCropperLauncher ],
  imports: [
    IconButton,
    LucideAngularModule,
    Button,
    Button,
    Button,
    Persona,
    MyPersonaText,
    NgOptimizedImage,
    NgIf
  ],
  host: {
    class: 'user-photo-edit-confirm'
  }
})
export class UserPhotoEditConfirm {
  icons = {XIcon, ArrowLeftIcon, LaptopIcon};

  get imageUrl(): string { return this.parent._imageUrl }

  constructor(public readonly parent: UserPhotoEdit,
             private _navHost: NavHost) {
  }



  back() {
    this._navHost.back()
  }

  changePhoto() {
    this.parent.upload()
  }


}
