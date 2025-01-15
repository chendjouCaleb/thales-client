import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {HorizontalPager, PageContentDef, TabRow, TabRowChangePayload, TabRowItem} from "@app/NeoUI";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {TraceModule} from "@app/trace";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";
import {ProcedureApplyFinance} from "@app/Components/procedure-apply/details/finance/procedure-apply-finance";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicket} from "@entities/plane-ticket";
import {PlaneTicketFinance} from "@app/Components/plane-tickets/details/finance/plane-ticket-finance";
import {PlaneTicketOverview} from "@app/Components/plane-tickets/details/overview/plane-ticket-overview";

@Component({
  templateUrl: 'plane-ticket-pager.html',
  selector: 'PlaneTicketPager, [PlaneTicketPager]',
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
    ProcedureApplyFinance,
    PlaneTicketFinance,
    PlaneTicketOverview
  ]
})
export class PlaneTicketPager implements OnInit {
  @Input()
  planeTicket: PlaneTicket

  @ViewChild(TabRow)
  tabRow: TabRow

  currentTab: string = 'overview'
  constructor(private _router: Router, private route: ActivatedRoute) {
    this.currentTab = route.snapshot.queryParams['tab']
  }

  ngOnInit(): void {
    if (!this.planeTicket) {
      throw new Error("procedureApply should not be null")
    }
  }

  onTabChange(payload: TabRowChangePayload) {
    console.log(payload)
    this._router.navigate([], {queryParams: {tab: payload.name}, replaceUrl: true})
  }
}
