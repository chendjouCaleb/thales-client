import {Component, Inject, OnInit} from "@angular/core";
import {ProcedureService} from "@app/services";
import {Agency, Customer, Procedure} from "@entities/index";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProcedureApplyAddProcedure} from "@app/Components/procedure-apply/add/procedure-apply-add-procedure";
import {ProcedureApplyAddCustomer} from "@app/Components/procedure-apply/add/procedure-apply-add-customer";
import {ProcedureApplyAddConfirm} from "@app/Components/procedure-apply/add/procedure-apply-add-confirm";
import {NavHost, NavRouteDef} from "@app/navigation";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";

@Component({
  templateUrl: 'procedure-apply-add.html',
  selector: 'ProcedureApplyAdd',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    ProcedureApplyAddProcedure,
    ProcedureApplyAddCustomer,
    ProcedureApplyAddConfirm,
    NavHost,
    NavRouteDef
  ],
  standalone: true
})
export class ProcedureApplyAdd implements OnInit {
  customer: Customer
  procedure: Procedure
  agency: Agency;

  procedures: Procedure[];

  constructor(private _service: ProcedureApplyService,
              private _procedureService: ProcedureService,
              private _dialogRef: DialogRef<any>,
              private _snackbar: MatSnackBar,
              @Inject(DIALOG_DATA) data) {
    this.customer = data.customer;
    this.procedure = data.procedure;
    this.agency = data.agency;
  }

  async ngOnInit() {
    this.procedures = await this._procedureService.listAsync({spaceId: this.agency.spaceId});
  }

  async add() {
    const apply = await this._service.addAsync(this.agency, this.customer, this.procedure);
    this._snackbar.open("Application ajoutée.", '', {duration: 5000});
    this._dialogRef.close(apply)
  }
}
