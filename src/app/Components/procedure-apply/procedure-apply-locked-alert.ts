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
  templateUrl: `
    <div class="borderRadius-8 padding-24 fontSize-24 d-flex flex-column-gap-24"
       style="background-color: var(--my-color-errorContainer); color: var(--my-color-onErrorContainer)">

    <lucide-icon [img]="icons.CircleAlertIcon" size="48"></lucide-icon>
    <div class="flex-grow-1">Cette procédure est bloquée. Aucune opération n'est donc autorisée sur elle.</div>
    <div class="marginTop-24 align-end">
        <button MyButton color="error">D'accord</button>
    </div>
  </div>
  `,
  selector: 'ProcedureApplyUnlock',
  host: {
    class: 'dialog-width-small'
  },
  imports: [
    Button
  ],
  standalone: true
})
export class ProcedureApplyLockedAlert {
  constructor(public dialogRef: DialogRef<void, ProcedureApplyLockedAlert>) {}
}
