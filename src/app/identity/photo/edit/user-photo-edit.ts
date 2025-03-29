import {Component, ViewEncapsulation} from "@angular/core";
import {NavHost, NavRouteDef} from "@app/navigation";
import {DialogRef} from "@angular/cdk/dialog";
import {UserPhotoEditHome} from "@app/identity/photo/edit/home/user-photo-edit-home";
import {UserPhotoEditUpload} from "@app/identity/photo/edit/upload/user-photo-edit-upload";

@Component({
  selector: 'UserPhotoEdit',
  templateUrl: 'user-photo-edit.html',
  styleUrl: 'user-photo-edit.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    NavHost,
    NavRouteDef,
    UserPhotoEditHome,
    UserPhotoEditUpload
  ],
  host: {
    class: 'user-photo-edit'
  }
})
export class UserPhotoEdit {
  constructor(private _dialogRef: DialogRef) {
  }

  close() {
    this._dialogRef.close()
  }
}
