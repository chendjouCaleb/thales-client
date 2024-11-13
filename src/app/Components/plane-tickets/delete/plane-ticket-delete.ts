import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PlaneTicket} from "../../../../entities";
import {PlaneTicketService} from "@app/services";

@Component({
  templateUrl: 'plane-ticket-delete.html',
  selector: 'PlaneTicket'
})
export class PlaneTicketDelete {
  planeTicket: PlaneTicket

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<PlaneTicketDelete>,
              private _service: PlaneTicketService,
              private _snackbar: MatSnackBar) {
    this.planeTicket = data.planeTicket;

  }

  async delete() {
    await this._service.deleteAsync(this.planeTicket);
    this._dialogRef.close(true);
    this._snackbar.open(`Le billet d'avion a supprimé.`, '', {duration: 5000})
  }
}
