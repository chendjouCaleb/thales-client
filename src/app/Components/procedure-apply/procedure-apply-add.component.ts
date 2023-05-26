import {Component, Inject, OnInit} from "@angular/core";
import {CustomerService} from "../../services";
import {Customer, Procedure} from "../../../entities";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  templateUrl: 'procedure-apply.html'
})
export class ProcedureApply implements OnInit {
  customer: Customer
  procedure: Procedure

  constructor(private _customerService: CustomerService, @Inject(MAT_DIALOG_DATA) data) {
    this.customer = data.customer;
    this.procedure = data.procedure;
  }

  async ngOnInit() {

  }

  add() {

  }
}
