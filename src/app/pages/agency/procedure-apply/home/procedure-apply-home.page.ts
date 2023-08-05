import {Component, OnInit} from "@angular/core";
import {ProcedureApplyService} from "@app/services";
import {ActivatedRoute} from "@angular/router";
import {ProcedureApply} from "@entities/index";
import {BreadcrumbItem} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'procedure-apply-home.page.html'
})
export class ProcedureApplyHomePage implements OnInit {
  apply: ProcedureApply;

  breadcrumbItems: BreadcrumbItem[];

  constructor(private _service: ProcedureApplyService,
              private _parent: AgencyPage,
              private _route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this._route.snapshot.params['procedureApplyId'];
    this.apply = await this._service.getByIdAsync(id);
    this._service.getApplyStepsAsync(this.apply).then(steps => {
      this.apply.steps = steps;
    });

    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Procédures en cours', `/agencies/${this.apply.agencyId}/procedure-applies`),
      new BreadcrumbItem(`Procédure N° ${this.apply.id}`)
    ];
  }

}
