import {Injectable} from "@angular/core";
import {Space} from "@entities/space";
import {Observable} from "rxjs";
import {Dialog} from "@angular/cdk/dialog";
import {SpaceAdd} from "@app/Components/space/add/space-add";

@Injectable({
  providedIn: 'root'
})
export class SpaceAddLauncher {

  constructor(private _dialog: Dialog) {
  }

  launch(): Observable<Space> {
    const dialogRef = this._dialog.open<Space>(SpaceAdd, {
      autoFocus: true,
      disableClose: true,
    });
    return dialogRef.closed;
  }
}
