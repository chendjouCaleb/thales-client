import {Component} from "@angular/core";
import {ProcedureApplyAdd} from "@app/Components";
import {Procedure} from "@entities/procedure";
import {NavHost} from "@app/navigation";

@Component({
  selector: 'procedure-apply-add-procedure',
  template: `
    <div class="fontWeight-semiBold fontSize-16">Choisir une procédure</div>
    <div class="mt-3">
      <mat-form-field class="w-100">
        <mat-select placeholder="Choisir une procédure" [(ngModel)]="selectedProcedure">
          <mat-option *ngFor="let procedure of procedures" [value]="procedure">
            {{procedure.name}}
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
