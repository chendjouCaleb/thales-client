import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "@entities/employee";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {MatButton} from "@angular/material/button";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {MemberHttpClient} from "@app/services";
import {Member} from "@entities/member";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'member-delete.html',
  selector: 'MemberDelete',
  imports: [
    Button
  ],
  standalone: true
})
export class MemberDelete {
  member: Member

  constructor(@Inject(DIALOG_DATA) data,
              public _dialogRef: DialogRef<boolean, MemberDelete>,
              private _httpClient: MemberHttpClient,
              private _snackbar: MatSnackBar) {
    this.member = data.member;
  }

  async delete() {
    await this._httpClient.deleteAsync(this.member);
    this._dialogRef.close(true);
    this._snackbar.open(`Ce membre a été supprimé.`, '', {duration: 5000})
  }


}
