import {Component, OnInit, ViewChild} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApply, ProcedureApplyStep} from "@entities/index";
import {MatDialog} from "@angular/material/dialog";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Money} from "@entities/money";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'procedure-apply-step-home.page.html'
})
export class ProcedureApplyStepHomePage implements OnInit {
  applyStep: ProcedureApplyStep;

  get apply(): ProcedureApply {
    return this.applyStep.procedureApply;
}

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  breadcrumbItems: BreadcrumbItem[];

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
              private _dialog: MatDialog,
              private _parent: AgencyPage,
              private _controller: ProcedureApplyController,
              private _route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['procedureApplyStepId'];
    this.applyStep = await this._service.getApplyStepByIdAsync(id);

    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Procédures en cours', `/agencies/${this.apply.agencyId}/procedure-applies`),
      new BreadcrumbItem(`Procédure N° ${this.apply.id}`, `/agencies/${this.apply.id}/procedure-applies`),
      new BreadcrumbItem(`étapes`),
      new BreadcrumbItem(`${this.applyStep.procedureStep.name}`)
    ];
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
