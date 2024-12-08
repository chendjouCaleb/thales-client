import {Component} from "@angular/core";
import {CustomerPickerDialog, ProcedureApplyAdd} from "@app/Components";
import {NavHost} from "@app/navigation";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'procedure-apply-add-confirm',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton
  ],
  template: `
    <div class="d-flex align-items-center">
      <button mat-icon-button (click)="back()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div class="ms-3 fontWeight-semiBold fontSize-16">Confirmation</div>
    </div>

    <div class="mt-3">
      <div class="label">Procédure</div>
      <div class="value">{{ parent.procedure.name }}</div>
    </div>

    <div class="mt-3">
      <div class="label">Client</div>
      <div class="value">{{ parent.customer.fullName }}</div>
    </div>

    <div class="align-end py-3">
      <button mat-flat-button color="primary" (click)="parent.add()">Ajouter</button>
    </div>
  `
})
export class ProcedureApplyAddConfirm {

  constructor(public parent: ProcedureApplyAdd,
              private _picker: CustomerPickerDialog,
              private _navHost: NavHost) {
  }

  back() {
    this._navHost.back();
  }
}
