import {Component, ViewEncapsulation} from "@angular/core";
import {NavHost, NavRouteDef} from "@app/navigation";
import {DialogRef} from "@angular/cdk/dialog";
import {UserPhotoEditHome} from "@app/identity/photo/edit/home/user-photo-edit-home";
import {UserPhotoEditUpload} from "@app/identity/photo/edit/upload/user-photo-edit-upload";
import {UserPhotoEditConfirm} from "@app/identity/photo/edit/confirm/user-photo-edit-confirm";
import {UserProfileService} from "@app/identity";

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
    UserPhotoEditUpload,
    UserPhotoEditConfirm
  ],
  host: {
    class: 'user-photo-edit'
  }
})
export class UserPhotoEdit {
  public _sourceImageUrl: string;
  public _sourceImageFile: File
  public _imageUrl: string;
  public _imageBlob: Blob


  constructor(private _dialogRef: DialogRef,
              private _userProfileService: UserProfileService) {
  }

  close() {
    this._dialogRef.close()
  }

  async upload() {
    await this._userProfileService.changePictureAsync(this._imageBlob, this._sourceImageFile.name);
    console.log('Upload done !')
  }
}
