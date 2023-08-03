import {Component, Inject, OnInit} from "@angular/core";
import {CustomerService, ProcedureService} from "../../../services";
import {Agency, Customer, Procedure} from "@entities/index";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "../../../services/procedure-apply.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'procedure-apply-add.html'
})
export class ProcedureApplyAdd implements OnInit {
  customer: Customer
  procedure: Procedure
  agency: Agency;

  procedures: Procedure[];

  constructor(private _service: ProcedureApplyService,
              private _procedureService: ProcedureService,
              private _dialogRef: MatDialogRef<any>,
              private _snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data) {
    this.customer = data.customer;
    this.procedure = data.procedure;
    this.agency = data.agency;
  }

  async ngOnInit() {
    this.procedures = await this._procedureService.listAsync();
  }

  async add() {
    const apply = await this._service.addAsync(this.agency, this.customer, this.procedure);
    this._snackbar.open("Application ajoutée.", '', {duration: 5000});
    this._dialogRef.close(apply)
  }
}
