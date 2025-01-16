import {Component, Input, OnInit} from "@angular/core";
import {Debt} from "@entities/finance";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {DebtDetails} from "@app/Components/debts/overview/details/debt-details";
import {IncomeListCard, IncomesList} from "@app/Components/incomes";
import {InfoIcon, LucideAngularModule} from "lucide-angular";

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
        IncomesList,
        IncomeListCard,
        LucideAngularModule
    ]
})
export class DebtPager implements OnInit {
  icons = { InfoIcon }
  @Input()
  debt: Debt

  ngOnInit() {
    if(!this.debt) {
      throw new Error("this.debt should not be null")
    }
  }
}
