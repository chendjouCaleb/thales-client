import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BreadcrumbItem, ProcedureApplyController} from "@app/Components";
import {Agency} from "@entities/agency";
import {AgencyPage} from "../../agency.page";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {ProcedureApply} from "@entities/procedure-apply";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {Button} from "@app/ui";


@Component({
  templateUrl: 'agency-procedure-applies-list.page.html',
  selector: 'AgencyProcedureAppliesListPage',
  standalone: true,

  imports: [
    LucideAngularModule,
    Button,
    ProcedureApplyList
  ]
})
export class AgencyProcedureAppliesListPage implements OnInit {
  icons = {PlusIcon}
  agency: Agency;

  @ViewChild(ProcedureApplyList)
  list: ProcedureApplyList;

  breadcrumbItems: BreadcrumbItem[];

  constructor(private router: Router,
              private _parent: AgencyPage,
              private _controller: ProcedureApplyController) {
    this.agency = _parent.agency;
  }

  async ngOnInit() {
    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Procédures en cours', )
    ];
  }

  apply() {
    this._controller.addProcedureApply(this.agency).subscribe(apply => {
      if(apply) {
        this.list.add(apply);
      }
    })

    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Paiements')
    ];
  }

  click(apply: ProcedureApply) {
    console.log(apply)
    this.router.navigate(['/agencies', apply.agencyId, 'procedure-applies', apply.id])
  }


}
