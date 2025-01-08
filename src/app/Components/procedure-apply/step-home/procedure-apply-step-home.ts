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
import {BanIcon, CheckIcon, CircleCheckBig, DollarSignIcon, LucideAngularModule, XIcon} from "lucide-angular";
import {MyBadge} from "@app/NeoUI";

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
    LucideAngularModule,
    MyBadge
  ]
})
export class ProcedureApplyStepHome implements OnInit {
  icons = { CheckIcon, XIcon, BanIcon, DollarSignIcon, CircleCheckBig }
  applyStep: ProcedureApplyStep;
  procedureApplyId: number;

  get apply(): ProcedureApply {
    return this.applyStep.procedureApply;
}

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  // get total(): Money | null {
  //   if(!this.paymentList?._payments)
  //     return null;
  //   return new Money(0, 'XAF').add(...this.paymentList._payments.map(p => p.amount));
  // }

  get remaining(): Money{
    return this.applyStep.procedureStep.price.subtract(this.applyStep.totalPayment);
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
        this.applyStep.totalPayment = this.applyStep.totalPayment.add(payment.amount);
        this.paymentList.unshift(payment);
      }
    });
  }

  validateStep() {
    const modalRef = this._controller.validate(this.applyStep);
  }

  invalidateStep() {
    this._controller.invalidate(this.applyStep);
  }

}
