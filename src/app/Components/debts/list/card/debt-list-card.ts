import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {Dropdown, MyBadge} from "@app/NeoUI";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {EllipsisVerticalIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {NgForOf, NgIf} from "@angular/common";
import {Debt} from "@entities/finance";
import {DebtOverviewLauncher} from "@app/Components/debts";
import {DebtEventStore} from "@app/services/debt-event-store";

@Component({
  templateUrl: 'debt-list-card.html',
  selector: 'DebtListCard, [DebtListCard]',
  encapsulation: ViewEncapsulation.None,
  imports: [
    Dropdown,
    IconButton,
    LucideAngularModule,
    Menu,
    MenuItem,
    MyBadge,
    NgForOf,
    NgIf
  ],
  standalone: true,
  providers: [DebtOverviewLauncher],
  host: {
    'class': 'surface hover paddingHorizontal-16 paddingVertical-8 borderRadius-8 cursor-pointer d-flex',
    '(click)': 'details(debt)'
  }
})
export class DebtListCard implements OnInit {
  icons = {EllipsisVerticalIcon, Trash2Icon}
  @Input()
  debt: Debt

  constructor(public readonly detailsLauncher: DebtOverviewLauncher,
              private readonly _debtEventStore: DebtEventStore,
  ) {
  }

  details(debt: Debt) {
    this.detailsLauncher.launch(debt)
  }

  ngOnInit() {
    this._debtEventStore.debts.addDebt(this.debt)
  }


  delete(debt: Debt) {
  }
}
