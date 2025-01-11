import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HorizontalPager, PageContentDef, TabRow, TabRowChangePayload, TabRowItem} from "@app/NeoUI";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {ProcedureApply} from "@entities/procedure-apply";
import {TraceModule} from "@app/trace";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";
import {ProcedureApplyFinance} from "@app/Components/procedure-apply/details/finance/procedure-apply-finance";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: 'procedure-apply-pager.html',
  selector: 'ProcedureApplyPager, [ProcedureApplyPager]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    TabRow,
    TabRowItem,
    HorizontalPager,
    PageContentDef,
    PaymentsList,
    TraceModule,
    ProcedureApplyHome,
    ProcedureApplyFinance
  ]
})
export class ProcedureApplyPager implements OnInit {
  @Input()
  procedureApply: ProcedureApply

  @ViewChild(TabRow)
  tabRow: TabRow

  currentTab: string = 'overview'
  constructor(private _router: Router, private route: ActivatedRoute) {
    this.currentTab = route.snapshot.queryParams['tab']
  }

  ngOnInit(): void {
    if (!this.procedureApply) {
      throw new Error("procedureApply should not be null")
    }
  }

  onTabChange(payload: TabRowChangePayload) {
    console.log(payload)
    this._router.navigate([], {queryParams: {tab: payload.name}})
  }
}
