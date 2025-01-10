import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {ProcedureApply} from "@entities/procedure-apply";
import {TraceModule} from "@app/trace";
import {ProcedureApplyHome} from "@app/Components/procedure-apply/details/home/procedure-apply-home";
import {ProcedureApplyFinance} from "@app/Components/procedure-apply/details/finance/procedure-apply-finance";

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

  ngOnInit(): void {
    if (!this.procedureApply) {
      throw new Error("procedureApply should not be null")
    }
  }
}
