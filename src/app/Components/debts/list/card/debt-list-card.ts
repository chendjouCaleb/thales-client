import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Dropdown, MyBadge} from "@app/NeoUI";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {EllipsisVerticalIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {NgForOf, NgIf} from "@angular/common";
import {Debt} from "@entities/finance";
import {DebtOverviewLauncher} from "@app/Components/debts";

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
  providers: [ DebtOverviewLauncher ],
  host: {
    'class' : 'surface hover paddingHorizontal-16 paddingVertical-8 borderRadius-8 cursor-pointer d-flex',
    '(click)' : 'details(debt)'
  }
})
export class DebtListCard {
  icons =  {EllipsisVerticalIcon, Trash2Icon}
  @Input()
  debt: Debt

  constructor(public readonly detailsLauncher: DebtOverviewLauncher,) {
  }

  details(debt: Debt) {
    this.detailsLauncher.launch(debt)
  }


  delete(debt: Debt) {}
}
