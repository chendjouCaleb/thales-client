import {Component, OnInit, ViewChild} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApplyStep} from "@entities/index";
import {MatDialog} from "@angular/material/dialog";
import {ProcedureApplyController} from "@app/Components";
import {PaymentsList} from "@app/Components/payments/list/payments-list";

@Component({
  templateUrl: 'procedure-apply-step-home.page.html'
})
export class ProcedureApplyStepHomePage implements OnInit {
  applyStep: ProcedureApplyStep;

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  constructor(private _service: ProcedureApplyService,
              private _dialog: MatDialog,
              private _controller: ProcedureApplyController,
              private _route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['procedureApplyStepId'];
    this.applyStep = await this._service.getApplyStepByIdAsync(id);
  }

  addPayment() {
    const modalRef = this._controller.addPayment(this.applyStep).subscribe(payment => {
      if (payment) {
        this.paymentList.unshift(payment);
      }
    });
  }

  validateStep() {
    const modalRef = this._controller.validate(this.applyStep)
      .subscribe(payment => {

      });
  }

  invalidateStep() {

  }

}
