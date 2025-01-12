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
import {
  BanIcon,
  CheckIcon,
  CircleCheckBig,
  DollarSignIcon, HandCoinsIcon,
  LucideAngularModule,
  WalletIcon,
  XIcon
} from "lucide-angular";
import {MyBadge} from "@app/NeoUI";
import {
  ProcedureApplyStepFinance
} from "@app/Components/procedure-apply/step-home/finance/procedure-apply-step-finance";
import {FinanceOverview} from "@entities/finance/finance-overview";

@Component({
  templateUrl: 'procedure-apply-step-home.html',
  selector: 'ProcedureApplyStepHome',
  standalone: true,
  styles: [`:host {
    display: block;
    width: 816px
  }`],
  imports: [
    NgIf,
    MatIcon,
    Button,
    PaymentsList,
    IconButton,
    LucideAngularModule,
    MyBadge,
    ProcedureApplyStepFinance
  ]
})
export class ProcedureApplyStepHome implements OnInit {
  icons = {
    CheckIcon, XIcon, BanIcon, DollarSignIcon, CircleCheckBig,
    WalletIcon, HandCoinsIcon
  }
  procedureApplyStep: ProcedureApplyStep;
  procedureApplyId: number;

  get apply(): ProcedureApply {
    return this.procedureApplyStep.procedureApply;
  }

  get financeOverview(): FinanceOverview {
    return this.procedureApplyStep.financeOverview
  }

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  // get total(): Money | null {
  //   if(!this.paymentList?._payments)
  //     return null;
  //   return new Money(0, 'XAF').add(...this.paymentList._payments.map(p => p.amount));
  // }

  get remaining(): Money {
    return this.procedureApplyStep.procedureStep.price.subtract(this.procedureApplyStep.totalPayment);
  }

  constructor(private _service: ProcedureApplyService,
              @Inject(DIALOG_DATA) private data: any,
              public _dialogRef: DialogRef<any>,
              public _dialog: Dialog,
              private _controller: ProcedureApplyController) {
    this.procedureApplyStep = data.procedureApplyStep;
  }

  async ngOnInit() {
    this.procedureApplyStep.financeOverview = new FinanceOverview(
      this.procedureApplyStep.incomes,
      this.procedureApplyStep.debts,
      this.procedureApplyStep.expenses
    )
  }

  addPayment() {
    const modalRef = this._controller.addPayment(this.procedureApplyStep).subscribe(payment => {
      if (payment) {
        this.procedureApplyStep.totalPayment = this.procedureApplyStep.totalPayment.add(payment.amount);
        this.paymentList.unshift(payment);
      }
    });
  }

  addIncome() {
    this._controller.addIncome(this.procedureApplyStep)
  }

  addExpense() {
    this._controller.addExpense(this.procedureApplyStep)
  }

  addDebt() {
    this._controller.addDebt(this.procedureApplyStep)
  }

  validateStep() {
    const modalRef = this._controller.validate(this.procedureApplyStep);
  }

  invalidateStep() {
    this._controller.invalidate(this.procedureApplyStep);
  }

}
