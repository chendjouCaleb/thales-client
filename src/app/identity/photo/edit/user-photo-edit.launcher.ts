import {Dialog} from "@angular/cdk/dialog";
import {UserPhotoEdit} from "./user-photo-edit";
import {Injectable} from "@angular/core";


@Injectable()
export class UserPhotoEditLauncher {
  constructor(private _dialog: Dialog) {}

  launch() {
    const dialogRef = this._dialog.open(UserPhotoEdit, {})
  }
}
