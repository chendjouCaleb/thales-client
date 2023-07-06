import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicket} from "../../../entities";
import {Observable} from "rxjs";
import {PlaneTicketDelete} from "./delete/plane-ticket-delete";

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketUIService {
  constructor(private _dialog: MatDialog) {}
  deletePlaneTicket(planeTicket: PlaneTicket): Observable<boolean> {
    const dialogRef = this._dialog.open(PlaneTicketDelete, {panelClass: 'dialog-panel', data: {planeTicket}});
    return dialogRef.afterClosed();
  }
}
