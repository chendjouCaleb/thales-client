import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {MatButton} from "@angular/material/button";
import {MemberHttpClient, ProcedureApplyService} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";
import {ProcedureApply} from "@entities/procedure-apply";

@Component({
  templateUrl: 'procedure-apply-done.html',
  selector: 'ProcedureApplyUndone',
  host: {
    class: 'dialog-width-small'
  },
  imports: [
    Button
  ],
  standalone: true
})
export class ProcedureApplyDone {
  procedureApply: ProcedureApply

  constructor(@Inject(DIALOG_DATA) data,
              public dialogRef: DialogRef<boolean, ProcedureApplyDone>,
              private _httpClient: ProcedureApplyService,
              private _snackbar: MatSnackBar) {
    this.procedureApply = data.procedureApply;
  }

  async unlock() {
    await this._httpClient.doneAsync(this.procedureApply);
    this.dialogRef.close(true);
    this._snackbar.open(`Cette procédure est maintenant clôturée.`, '', {duration: 3000})
  }
}
