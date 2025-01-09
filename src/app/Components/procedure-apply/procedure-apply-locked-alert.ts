import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Member} from "@entities/member";
import {MatButton} from "@angular/material/button";
import {MemberHttpClient, ProcedureApplyService} from "@app/services";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";
import {ProcedureApply} from "@entities/procedure-apply";
import {CircleAlertIcon, LucideAngularModule} from "lucide-angular";

@Component({
  template: `
    <div class="padding-24">
      <div class="d-flex flex-column-gap-24"
           style="background-color: var(--my-color-errorContainer); color: var(--my-color-onErrorContainer)">

        <lucide-icon [img]="icons.CircleAlertIcon" size="48"></lucide-icon>
        <div class="flex-grow-1">
          <div class="fontSize-20 fontWeight-semibold">Procédure bloquée</div>
          <div class="marginTop-12">
            Cette procédure est bloquée. Aucune opération n'est donc autorisée sur elle.
          </div>
        </div>
      </div>

      <div class="marginTop-24 align-end">
        <button MyButton color="error" (click)="dialogRef.close()">D'accord</button>
      </div>
    </div>
  `,
  selector: 'ProcedureApplyDone',
  host: {
    class: 'dialog-width-small'
  },
  imports: [
    Button,
    LucideAngularModule
  ],
  standalone: true
})
export class ProcedureApplyLockedAlert {
  icons = { CircleAlertIcon }
  constructor(public dialogRef: DialogRef<void, ProcedureApplyLockedAlert>) {}
}
