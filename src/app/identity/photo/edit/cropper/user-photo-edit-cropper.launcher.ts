import {Injectable} from "@angular/core";
import {Dialog} from "@angular/cdk/dialog";
import {UserPhotoEditCropper} from "@app/identity/photo/edit/cropper/user-photo-edit-cropper";
import {Observable} from "rxjs";

@Injectable()
export class UserPhotoEditCropperLauncher {
  constructor(private _dialog: Dialog) {}

  launch(imageUrl: string): Observable<Blob | null> {
    const dialogRef = this._dialog.open<Blob>(UserPhotoEditCropper, {
      data: {imageUrl}
    });

    return dialogRef.closed;
  }
}
