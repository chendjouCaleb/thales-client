import {SessionStore} from "@app/utils";
import {Observable} from "rxjs";
import {Dialog} from "@angular/cdk/dialog";
import {Space} from "@entities/space";
import {SpaceEditProfile} from "./space-edit-profile";
import {Injectable} from "@angular/core";

@Injectable()
export class SpaceEditProfileLauncher {
  store = new SessionStore('plane-ticket-add');

  constructor(private _dialog: Dialog) {
  }

  launch(space: Space): Observable<void> {
    const dialogRef = this._dialog.open<void>(SpaceEditProfile,
      {data: {space}});
    return dialogRef.closed;
  }

}




