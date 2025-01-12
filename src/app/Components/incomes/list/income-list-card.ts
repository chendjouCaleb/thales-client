import {Component, Input} from "@angular/core";
import {Dropdown} from "@app/NeoUI";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {EllipsisVerticalIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {NgForOf} from "@angular/common";
import {Income} from "@entities/finance";
import {IncomeDetailsLauncher} from "@app/Components/incomes";

@Component({
  template: `
    <div
      class="surface hover paddingHorizontal-16 paddingVertical-8 borderRadius-8 cursor-pointer d-flex"
      (click)="details(income)">

      <div class="flex-grow-1">
        <div class="fontSize-18 fontWeight-bold">
          {{ income.amount.format() }}
        </div>

        <div class="fontSize-12 opacity-6">

          {{ income.member?.user?.fullName }}
          &bull;
          {{ income.createdAt.moment() }}

        </div>
      </div>


      <button MyIconButton #menuTrigger
              (click)="dropdown.open(); $event.stopPropagation()">
        <lucide-angular [img]="icons.EllipsisVerticalIcon" size="16"></lucide-angular>
      </button>

      <Dropdown #dropdown [trigger]="menuTrigger.host"
                (onBackdropClick)="dropdown.close()">
        <MyMenu>


          <button MenuItem (click)="delete(income)">
            <lucide-icon [img]="icons.Trash2Icon" strokeWidth="1.5"></lucide-icon>
            Supprimer
          </button>
        </MyMenu>
      </Dropdown>

    </div>
  `,
  styles: [':host { display: block}'],
  selector: 'IncomeListCard, [IncomeListCard]',
  imports: [
    Dropdown,
    IconButton,
    LucideAngularModule,
    Menu,
    MenuItem,
    NgForOf
  ],
  standalone: true,
  providers: [ IncomeDetailsLauncher ]
})
export class IncomeListCard {
  icons = { EllipsisVerticalIcon, Trash2Icon }

  @Input()
  income: Income

  constructor(public readonly detailsLauncher: IncomeDetailsLauncher) {
  }

  details(income: Income) {
    this.detailsLauncher.launch(income)
  }

  delete(income: Income) { }
}
