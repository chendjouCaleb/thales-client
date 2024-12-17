import {Observable} from "rxjs";
import {MemberAdd} from "@app/Components/members/add/member-add";
import {Injectable} from "@angular/core";
import {Member, MemberJobInfo} from "@entities/member";
import {MemberDelete} from "@app/Components/members/delete/member-delete";
import {Dialog} from "@angular/cdk/dialog";
import {MemberSetAdmin} from "@app/Components/members/set-admin/member-set-admin";
import {MemberUnsetAdmin} from "@app/Components/members/unset-admin/member-unset-admin";
import {Space} from "@entities/space";
import {MemberLock} from "@app/Components/members/lock/member-lock";
import {MemberUnlock} from "@app/Components/members/unlock/member-unlock";
import {MemberChangeJobInfo} from "@app/Components/members/job-info/member-change-job-info";

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

  changeJobInfo(member: Member): Observable<MemberJobInfo> {
    const dialogRef = this._dialog.open<MemberJobInfo>(MemberChangeJobInfo, {data: {member}});
    return dialogRef.closed;
  }

  lock(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberLock, {data: {member}});
    return dialogRef.closed;
  }

  unlock(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberUnlock, {data: {member}});
    return dialogRef.closed;
  }

  delete(member: Member): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(MemberDelete, {autoFocus: false, data: {member}});
    return dialogRef.closed;
  }
}
