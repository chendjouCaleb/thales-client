import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";
import {MemberHttpClient} from "@app/services";

@Component({
  templateUrl: 'member-unset-admin.html',
  selector: 'MemberUnsetAdmin',
  imports: [
    Button
  ],
  standalone: true
})
export class MemberUnsetAdmin {
  member: Member

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<boolean, MemberUnsetAdmin>,
              private _httpClient: MemberHttpClient,
              private _snackbar: MatSnackBar) {
    this.member = data.member;
  }

  async unsetAdmin() {
    await this._httpClient.toggleAdminAsync(this.member);
    this._dialogRef.close(true);
    this._snackbar.open(`Ce membre n'est plus un administrateur.`, '', {duration: 3000})
  }
}
