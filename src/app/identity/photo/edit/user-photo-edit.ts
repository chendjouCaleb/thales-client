import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {NavHost, NavRouteDef} from "@app/navigation";
import {DialogRef} from "@angular/cdk/dialog";
import {UserPhotoEditHome} from "@app/identity/photo/edit/home/user-photo-edit-home";
import {UserPhotoEditUpload} from "@app/identity/photo/edit/upload/user-photo-edit-upload";
import {UserPhotoEditConfirm} from "@app/identity/photo/edit/confirm/user-photo-edit-confirm";
import {UserProfileService} from "@app/identity";
import {Toast} from "neo-ui";

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
    class: 'user-photo-edit',
    '[style.width.px]':'width'
  }
})
export class UserPhotoEdit implements OnInit {
  public _sourceImageUrl: string;
  public _sourceImageFile: File
  public _imageUrl: string;
  public _imageBlob: Blob

  @ViewChild(NavHost)
  navHost: NavHost

  get width(): number {
    if(!this.navHost) {
      return 400
    }
    if(this.navHost.activeRoute.name === 'home') {
      return  400;
    }
    return 840;
  }


  constructor(private _dialogRef: DialogRef,
              private _userProfileService: UserProfileService,

              private _toast: Toast) {

  }

  ngOnInit() {

  }

  close() {
    this._dialogRef.close()
  }

  async upload() {
    await this._userProfileService.changePictureAsync(this._imageBlob, this._sourceImageFile.name);
    this._dialogRef.close()
    this._toast.show({intent: 'info', title: 'Photo de profil',
    body: 'Votre photo de profil a été correctement changée.'}, 5000)
  }
}
