import {Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Message} from "../../../entities";
import {Observable} from "rxjs";
import {MessageDelete} from "./delete/message-delete";

@Injectable({
  providedIn: 'root'
})
export class MessageController {
  constructor(private _dialog: MatDialog) {}

  deleteMessage(message: Message): Observable<boolean> {
    const dialogRef = this._dialog.open(MessageDelete, {panelClass: 'dialog-panel', data: {message}});
    return dialogRef.afterClosed();
  }
}
