import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApply, ProcedureApplyStep} from "@entities/index";
import {MatDialog} from "@angular/material/dialog";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Money} from "@entities/money";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {Dialog, DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Button, IconButton} from "@app/ui";
import {CheckIcon, LucideAngularModule, XIcon} from "lucide-angular";

@Component({
  templateUrl: 'procedure-apply-step-home.html',
  selector: 'ProcedureApplyStepHome',
  standalone: true,
  styles: [ `:host {display: block; width: 616px}`],
  imports: [
    NgIf,
    MatIcon,
    Button,
    PaymentsList,
    IconButton,
    LucideAngularModule
  ]
})
export class ProcedureApplyStepHome implements OnInit {
  icons = { CheckIcon, XIcon }
  applyStep: ProcedureApplyStep;
  procedureApplyId: number;

  get apply(): ProcedureApply {
    return this.applyStep.procedureApply;
}

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  get total(): Money | null {
    if(!this.paymentList?._payments)
      return null;
    return new Money(0, 'XAF').add(...this.paymentList._payments.map(p => p.amount));
  }

  get remaining(): Money | null {
    if(!this.paymentList?._payments)
      return null;
    return this.applyStep.procedureStep.price.subtract(...this.paymentList._payments.map(p => p.amount));
  }

  constructor(private _service: ProcedureApplyService,
              @Inject(DIALOG_DATA) private data: any,
              public _dialogRef: DialogRef<any>,
              public _dialog: Dialog,
              private _controller: ProcedureApplyController) {
    const applyStep = data.applyStep
    this.procedureApplyId = applyStep.id;
  }

  async ngOnInit() {
    this.applyStep = await this._service.getApplyStepByIdAsync(this.procedureApplyId);
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
        this.paymentList.unshift(payment);
      });
  }

  invalidateStep() {

  }

}
