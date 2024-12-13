import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Agency, PlaneTicket} from "../../../entities";
import {Observable} from "rxjs";
import {PlaneTicketDelete} from "./delete/plane-ticket-delete";
import {Dialog} from "@angular/cdk/dialog";
import {PlaneTicketAdd} from "@app/Components/plane-tickets/add/plane-ticket-add";
import {PlaneTicketEdit} from "@app/Components/plane-tickets/edit/plane-ticket-edit";

@Injectable({
  providedIn: 'root'
})
export class PlaneTicketUIService {
  constructor(private _dialog: Dialog) {}
  deletePlaneTicket(planeTicket: PlaneTicket): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(PlaneTicketDelete,
      { data: {planeTicket}});
    return dialogRef.closed
  }

  editPlaneTicket(planeTicket: PlaneTicket): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(PlaneTicketEdit,
      { data: {planeTicket}});
    return dialogRef.closed
  }

  addPlaneTicket(agency: Agency): Observable<PlaneTicket> {
    const dialogRef = this._dialog.open<PlaneTicket>(PlaneTicketAdd,
      { data: {agency}});
    return dialogRef.closed;
  }
}
