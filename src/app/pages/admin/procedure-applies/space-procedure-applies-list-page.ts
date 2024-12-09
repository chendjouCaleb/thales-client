import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {ProcedureApply} from "@entities/procedure-apply";
import {AdminPage} from "@app/pages/admin/admin.page";


@Component({
  selector: 'ProcedureAppliesListPage',
  template: `
    <div class="p-4">
      <div class="fontSize-20 fontWeight-semiBold">Procédures en cours</div>
      <div class="mt-4">
        <procedure-apply-list (rowClick)="click($event)"></procedure-apply-list>
      </div>
    </div>
  `,
  imports: [
    ProcedureApplyList
  ],
  standalone: true
})
export class SpaceProcedureAppliesListPage implements OnInit {

  constructor(private router: Router,
              private _parent: AdminPage) {}

  async ngOnInit() {

  }

  click(apply: ProcedureApply) {
    this.router.navigate(['/admin', this._parent.space.identifier, 'procedure-applies', apply.id])
  }

}
