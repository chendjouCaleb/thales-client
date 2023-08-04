import {Component, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import { ProcedureApplyStep} from "@entities/index";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureApplyStepValidate} from "../../../../Components/procedure-apply/validate/procedure-apply-step-validate";
import {ProcedureApplyStepPaymentAdd} from "../../../../Components/procedure-apply/add-payment/procedure-apply-step-payment-add";

@Component({
  templateUrl: 'procedure-apply-step-home.page.html'
})
export class ProcedureApplyStepHomePage implements OnInit {
  applyStep: ProcedureApplyStep;

  constructor(private _service: ProcedureApplyService,
              private _dialog: MatDialog,
              private _route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this._route.snapshot.params['procedureApplyStepId'];
    this.applyStep = await this._service.getApplyStepByIdAsync(id);
  }

  addPayment() {
    const modalRef = this._dialog.open(ProcedureApplyStepPaymentAdd, {data: {applyStep: this.applyStep}});
  }

  validateStep() {
    const modalRef = this._dialog.open(ProcedureApplyStepValidate, {data: {applyStep: this.applyStep}});
  }

  invalidateStep() {

  }

}
