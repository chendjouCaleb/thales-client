import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlaneTicket} from "../../../../entities";
import {PlaneTicketService} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'plane-ticket-delete.html',
  selector: 'PlaneTicket',
  imports: [
    Button
  ],
  standalone: true
})
export class PlaneTicketDelete {
  planeTicket: PlaneTicket

  constructor(@Inject(DIALOG_DATA) data: any
              ,
              public _dialogRef: DialogRef<boolean, PlaneTicketDelete>,
              private _service: PlaneTicketService,
              private _snackbar: MatSnackBar) {
    this.planeTicket = data.planeTicket;

  }

  async delete() {
    await this._service.deleteAsync(this.planeTicket);
    this._dialogRef.close(true);
    this._snackbar.open(`Le billet d'avion a supprimé.`, '', {duration: 3000})
  }
}
