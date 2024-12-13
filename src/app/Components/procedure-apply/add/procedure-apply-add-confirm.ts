import {Component} from "@angular/core";
import {CustomerPickerDialog, ProcedureApplyAdd} from "@app/Components";
import {NavHost} from "@app/navigation";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";

@Component({
  selector: 'procedure-apply-add-confirm',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    IconButton,
    LucideAngularModule,
    Button
  ],
  template: `
    <div class="d-flex align-items-center">
      <button MyIconButton (click)="back()">
        <lucide-icon [img]="icons.ChevronLeftIcon"></lucide-icon>
      </button>
      <div class="ms-3 fontWeight-semiBold fontSize-16">Confirmation</div>
    </div>

    <div class="mt-3">
      <div class="label">Procédure</div>
      <div class="opacity-8">{{ parent.procedure.name }}</div>
    </div>

    <div class="mt-3">
      <div class="label">Client</div>
      <div class="opacity-8">{{ parent.customer.fullName }}</div>
    </div>

    <div class="align-end py-3">
      <button MyButton class="primary" (click)="parent.add()">Lancer la procédure</button>
    </div>
  `
})
export class ProcedureApplyAddConfirm {
  icons = { ChevronLeftIcon }
  constructor(public parent: ProcedureApplyAdd,
              private _navHost: NavHost) {
  }

  back() {
    this._navHost.back();
  }
}
