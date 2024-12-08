import {Component} from "@angular/core";
import {ProcedureApplyAdd} from "@app/Components";
import {Procedure} from "@entities/procedure";
import {NavHost} from "@app/navigation";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'procedure-apply-add-procedure',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    NgForOf,
    MatButton
  ],
  template: `
    <div class="fontWeight-semiBold fontSize-16">Choisir une procédure</div>
    <div class="mt-3">
      <mat-form-field class="w-100">
        <mat-select placeholder="Choisir une procédure" [(ngModel)]="selectedProcedure">
          <mat-option *ngFor="let procedure of procedures" [value]="procedure">
            {{ procedure.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </div>

    <div class="align-end py-3">
      <button mat-flat-button color="primary" (click)="next()" [disabled]="!selectedProcedure">Suivant</button>
    </div>
  `
})
export class ProcedureApplyAddProcedure {
  selectedProcedure: Procedure;
  constructor(private _parent: ProcedureApplyAdd, public navHost: NavHost) {}

  get procedures(): Procedure[] {
    return this._parent.procedures;
  }

  next() {
    this._parent.procedure = this.selectedProcedure;
    this.navHost.navigateByUrl('customer')
  }
}
