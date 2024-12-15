import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {MemberAdd} from "@app/Components/members/add/member-add";
import {Injectable} from "@angular/core";
import {Member} from "@entities/member";
import {Agency} from "@entities/agency";
import {MemberDelete} from "@app/Components/members/delete/member-delete";
import {Dialog} from "@angular/cdk/dialog";
import {MemberSetAdmin} from "@app/Components/members/set-admin/member-set-admin";
import {MemberUnsetAdmin} from "@app/Components/members/unset-admin/member-unset-admin";
import {Space} from "@entities/space";

@Injectable()
export class MemberUIService {
  constructor(private _dialog: Dialog) {
  }

  add(space: Space): Observable<Member> {
    const dialogRef = this._dialog.open<Member>(MemberAdd, {
      data: {space},
      autoFocus: true,
      disableClose: true,
    });
    return dialogRef.closed;
  }

  setAdmin(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberSetAdmin, {data: {member}});
    return dialogRef.closed;
  }

  unsetAdmin(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberUnsetAdmin, {data: {member}});
    return dialogRef.closed;
  }

  delete(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberDelete, {autoFocus: false, data: {member}});
    return dialogRef.closed;
  }
}
