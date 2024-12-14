import {Injectable} from "@angular/core";
import {Agency, Space} from "../../../entities";
import {Observable} from "rxjs";
import {AgencyAdd} from "./add/agency-add";
import {AgencyDelete} from "./delete/agency-delete";
import {AgencyChangeName} from "@app/Components/agencies/change-name/agency-change-name";
import {AgencyEdit} from "@app/Components/agencies/edit/agency-edit";
import {Dialog} from "@angular/cdk/dialog";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  constructor(private _dialog: Dialog) {}

  addAgency(space: Space): Observable<Agency> {
    const dialogRef = this._dialog.open<Agency>(AgencyAdd, {data: {space}});
    return dialogRef.closed;
  }

  changeAgencyName(agency: Agency): Observable<string> {
    const dialogRef = this._dialog.open<string>(AgencyChangeName, { data: {agency}, autoFocus: true});
    return dialogRef.closed;
  }

  editAgency(agency: Agency): Observable<any> {
    const dialogRef = this._dialog.open<any>(AgencyEdit, {data: {agency}, autoFocus: true});
    return dialogRef.closed;
  }

  deleteAgency(agency: Agency): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(AgencyDelete, {data: {agency}, autoFocus: true});
    return dialogRef.closed;
  }
}
