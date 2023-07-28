import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency, Customer} from "../../../entities";
import {Observable} from "rxjs";
import {AgencyAdd} from "./add/agency-add";
import {AgencyDelete} from "./delete/agency-delete";

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  constructor(private _dialog: MatDialog) {}

  addAgency(): Observable<Agency> {
    const dialogRef = this._dialog.open(AgencyAdd, {panelClass: 'dialog-panel'});
    return dialogRef.afterClosed();
  }

  deleteAgency(agency: Agency): Observable<boolean> {
    const dialogRef = this._dialog.open(AgencyDelete, {panelClass: 'dialog-panel', data: {agency}});
    return dialogRef.afterClosed();
  }
}
