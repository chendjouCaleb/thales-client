import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProcedureApplyService} from "@app/services";
import {ProcedureApplyList} from "@app/Components/procedure-apply/list/procedure-apply-list";
import {ProcedureApply} from "@entities/procedure-apply";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";


@Component({
  selector: 'ProcedureAppliesListPage',
  template: `
    <div class="p-4">
      <div class="fontSize-20 fontWeight-semiBold">Procédures en cours</div>
      <div class="mt-4">
        <procedure-apply-list (rowClick)="click($event)" [params]="params"></procedure-apply-list>
      </div>
    </div>
  `,
  imports: [
    ProcedureApplyList
  ],
  standalone: true
})
export class SpaceProcedureAppliesListPage implements OnInit {
  space: Space;
  params: any

  constructor(private router: Router,
              private _parent: AdminPage) {
    this.space = _parent.space;
    this.params = {spaceId: this.space.id }
  }

  async ngOnInit() {

  }

  click(apply: ProcedureApply) {
    this.router.navigate(['/admin', this._parent.space.identifier, 'procedure-applies', apply.id])
  }

}
