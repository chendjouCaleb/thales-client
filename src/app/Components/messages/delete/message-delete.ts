import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Message} from "@entities/message";
import {MessageHttpClient} from "@app/services/message.service";

@Component({
  templateUrl: 'message-delete.html'
})
export class MessageDelete {
  message: Message

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<MessageDelete>,
              private _httpClient: MessageHttpClient,
              private _snackbar: MatSnackBar) {
    this.message = data.message;

  }

  async delete() {
    await this._httpClient.deleteAsync(this.message);
    this._dialogRef.close(true);
    this._snackbar.open(`Message supprimé.`, '', {duration: 5000})
  }
}
