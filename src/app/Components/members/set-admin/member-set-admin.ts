import {Component, Inject} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {MemberHttpClient} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'member-set-admin.html',
  selector: 'MemberUnlock',
  imports: [
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
    await this._httpClient.toggleAdminAsync(this.member);
    this.member.isAdmin = true;
    this.dialogRef.close(true);
    this._snackbar.open(`Ce membre est maintenant un administrateur.`, '', {duration: 5000})
  }
}
