import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {MatButton} from "@angular/material/button";
import {MemberHttpClient} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'member-lock.html',
  selector: 'MemberLock',
  imports: [
    Button
  ],
  standalone: true
})
export class MemberLock {
  member: Member

  constructor(@Inject(DIALOG_DATA) data,
              public dialogRef: DialogRef<boolean, MemberLock>,
              private _httpClient: MemberHttpClient,
              private _snackbar: MatSnackBar) {
    this.member = data.member;
  }

  async setAdmin() {
    await this._httpClient.toggleLockAsync(this.member);
    this.dialogRef.close(true);
    this._snackbar.open(`Ce membre est maintenant bloqué.`, '', {duration: 3000})
  }
}
