import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {MatButton} from "@angular/material/button";
import {MemberHttpClient} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'member-set-admin.html',
  selector: 'MemberSetAdmin',
  imports: [
    MatButton,
    MatDialogClose,
    Button
  ],
  standalone: true
})
export class MemberSetAdmin {
  member: Member

  constructor(@Inject(DIALOG_DATA) data,
              public dialogRef: DialogRef<boolean, MemberSetAdmin>,
              private _httpClient: MemberHttpClient,
              private _snackbar: MatSnackBar) {
    this.member = data.member;
  }

  async setAdmin() {
    await this._httpClient.setAdminAsync(this.member);
    this.member.isAdmin = true;
    this.dialogRef.close(true);
    this._snackbar.open(`Ce membre est maintenant un administrateur.`, '', {duration: 5000})
  }
}
