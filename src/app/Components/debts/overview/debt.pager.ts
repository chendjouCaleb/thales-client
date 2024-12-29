import {Component, Input, OnInit} from "@angular/core";
import {Debt} from "@entities/finance";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {DebtDetails} from "@app/Components/debts/overview/details/debt-details";
import {IncomesList} from "@app/Components/incomes";

@Component({
  templateUrl: 'debt.pager.html',
  selector: 'DebtPager, [DebtPager]',
  standalone: true,
  imports: [
    PageContentDef,
    HorizontalPager,
    TabRowItem,
    TabRow,
    DebtDetails,
    IncomesList
  ]
})
export class DebtPager implements OnInit {
  @Input()
  debt: Debt

  ngOnInit() {
    if(!this.debt) {
      throw new Error("this.debt should not be null")
    }
  }
}
