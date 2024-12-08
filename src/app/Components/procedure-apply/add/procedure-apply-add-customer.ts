import {Component} from "@angular/core";
import { CustomerPickerDialog, ProcedureApplyAdd} from "@app/Components";
import {NavHost} from "@app/navigation";
import {Customer} from "@entities/customer";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'procedure-apply-add-customer',
  standalone: true,
  imports: [
    MatIconButton,
    MatFormField,
    MatInput,
    MatButton,
    MatIcon
  ],
  template: `
    <div class="d-flex align-items-center">
      <button mat-icon-button (click)="back()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div class="ms-3 fontWeight-semiBold fontSize-16">{{ parent.procedure.name }}</div>
    </div>

    <div class="fontSize-16 mt-3 mb-2">Choisir un client</div>
    <mat-form-field class="w-100">
      <input type="text" matInput [value]="customer?.fullName" placeholder="Choisir un client"
             (click)="selectCustomer($event)">
    </mat-form-field>

    <div class="align-end py-3">
      <button mat-flat-button color="primary" (click)="next()" [disabled]="!customer">Suivant</button>
    </div>
  `
})
export class ProcedureApplyAddCustomer {
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
