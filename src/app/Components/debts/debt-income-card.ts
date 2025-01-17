import {Component, Input, OnInit} from "@angular/core";
import {Dropdown} from "@app/NeoUI";
import {IconButton, Menu, MenuItem} from "@app/ui";
import {EllipsisVerticalIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {NgForOf} from "@angular/common";
import {DebtIncome, Income} from "@entities/finance";
import {IncomeDetailsLauncher} from "@app/Components/incomes";
import {DebtDeleteLauncher} from "@app/Components/debts/delete";
import {DebtIncomeDeleteLauncher} from "@app/Components/debts/income-delete";
import {DebtEventStore} from "@app/services/debt-event-store";

@Component({
  template: `
    <div
      class="surface hover paddingHorizontal-16 paddingVertical-8 borderRadius-8 cursor-pointer d-flex"
      (click)="details(income)">

      <div class="flex-grow-1">
        <div class="fontSize-16 fontWeight-semiBold">
          {{ income.amount.format() }}
        </div>

        <div class="fontSize-12 opacity-6">

          @if(income.member?.user) {
            {{ income.member?.user?.fullName }}
            &bull;
          }
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


          <button MenuItem (click)="delete()">
            <lucide-icon [img]="icons.Trash2Icon" strokeWidth="1.5"></lucide-icon>
            Supprimer
          </button>
        </MyMenu>
      </Dropdown>

    </div>
  `,
  styles: [':host { display: block}'],
  selector: 'DebtIncomeListCard, [DebtIncomeListCard]',
  imports: [
    Dropdown,
    IconButton,
    LucideAngularModule,
    Menu,
    MenuItem,
    NgForOf
  ],
  standalone: true,
  providers: [ IncomeDetailsLauncher, DebtIncomeDeleteLauncher ]
})
export class DebtIncomeListCard implements OnInit {
  icons = { EllipsisVerticalIcon, Trash2Icon }

  @Input()
  debtIncome: DebtIncome

  get income(): Income {
    return this.debtIncome.income
  }

  constructor(public readonly detailsLauncher: IncomeDetailsLauncher,
              private _debtEventStore: DebtEventStore,
              private deleteLauncher: DebtIncomeDeleteLauncher) {
  }

  ngOnInit() {

  }

  details(income: Income) {
    this.detailsLauncher.launch(income)
  }

  delete() {
    this.deleteLauncher.launch(this.debtIncome)
  }
}
