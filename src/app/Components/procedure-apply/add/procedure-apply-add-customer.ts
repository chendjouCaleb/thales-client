import {Component} from "@angular/core";
import { CustomerPickerDialog, ProcedureApplyAdd} from "@app/Components";
import {NavHost} from "@app/navigation";
import {Customer} from "@entities/customer";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {Button, IconButton} from "@app/ui";
import {ChevronDownIcon, ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {NgIf} from "@angular/common";

@Component({
  selector: 'procedure-apply-add-customer',
  standalone: true,
  imports: [
    MatIconButton,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon,
    Button,
    LucideAngularModule,
    IconButton,
    NgIf
  ],
  providers: [ CustomerPickerDialog],
  template: `
    <div class="d-flex align-items-center">
      <button MyIconButton (click)="back()">
        <lucide-icon [img]="icons.ChevronLeftIcon"></lucide-icon>
      </button>
      <div class="ms-3 fontWeight-semiBold fontSize-16">{{ parent.procedure.name }}</div>
    </div>

    <div class="fontSize-16 mt-3 mb-2">Choisir un client</div>
    <div style="background-color: var(--my-SurfaceColor); padding: 8px; border-radius: 8px;
      display: flex; align-items: center; cursor: pointer" tabindex="1" (click)="selectCustomer($event)">
      <div class="flex-grow-1">
        <div *ngIf="customer"  >{{ customer.fullName }}</div>
        <div *ngIf="!customer" class="opacity-5">Choisir un client</div>
      </div>

      <lucide-angular class="opacity-5" [img]="icons.ChevronDownIcon"></lucide-angular>
    </div>

    <div class="align-end py-3">
      <button MyButton class="primary" (click)="next()" [disabled]="!customer">Suivant</button>
    </div>
  `
})
export class ProcedureApplyAddCustomer {
  icons = { ChevronLeftIcon, ChevronDownIcon }
  customer:Customer;
  constructor(public parent: ProcedureApplyAdd,
              private _picker: CustomerPickerDialog,
              private _navHost: NavHost) {
  }
  selectCustomer(event) {
    event?.preventDefault();
    event.stopPropagation();
    this._picker.open().subscribe(customer => {
      if(customer) {
        this.customer = customer;
      }
    })
  }

  next() {
    this.parent.customer = this.customer;
    this._navHost.navigateByUrl('confirm');
  }

  back() {
    this._navHost.back();
  }
}
