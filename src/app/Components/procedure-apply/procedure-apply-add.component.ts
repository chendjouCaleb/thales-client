import {Component, Inject, OnInit} from "@angular/core";
import {CustomerService} from "../../services";
import {Customer, Procedure} from "../../../entities";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProcedureApplyService} from "../../services/procedure-apply.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'procedure-apply-add.component.html'
})
export class ProcedureApplyAdd implements OnInit {
  customer: Customer
  procedure: Procedure

  constructor(private _service: ProcedureApplyService,
              private _dialogRef: MatDialogRef<any>,
              private _snackbar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data) {
    this.customer = data.customer;
    this.procedure = data.procedure;
  }

  async ngOnInit() {

  }

  async add() {
    const apply = await this._service.addAsync(this.customer, this.procedure);
    this._snackbar.open("Application ajoutée.", '', {duration: 5000});
    this._dialogRef.close(apply)
  }
}
