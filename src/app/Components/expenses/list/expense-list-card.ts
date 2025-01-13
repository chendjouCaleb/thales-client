import {Component, Input} from "@angular/core";
import {Expense} from "@entities/finance";
import {ExpenseDetailsLauncher} from "@app/Components/expenses/details";
import {EllipsisVerticalIcon, LucideAngularModule, Trash2Icon} from "lucide-angular";
import {Dropdown} from "@app/NeoUI";
import {IconButton, Menu, MenuItem} from "@app/ui";

@Component({
  template: `
    <div class="surface hover paddingHorizontal-16 paddingVertical-8 borderRadius-8 cursor-pointer d-flex"
         (click)="details(expense)">

      <div class="flex-grow-1">
        <div class="fontSize-16 fontWeight-semiBold">
          {{ expense.amount.format() }}
        </div>

        <div class="marginHorizontal-2 opacity-8">
          {{ expense.reason }}
        </div>

        <div class="fontSize-12 opacity-6">

          {{ expense.member?.user?.fullName }}
          &bull;
          {{ expense.createdAt.moment() }}

        </div>
      </div>


      <button MyIconButton #menuTrigger
              (click)="dropdown.open(); $event.stopPropagation()">
        <lucide-angular [img]="icons.EllipsisVerticalIcon" size="16"></lucide-angular>
      </button>

      <Dropdown #dropdown [trigger]="menuTrigger.host"
                (onBackdropClick)="dropdown.close()">
        <MyMenu>


          <button MenuItem (click)="delete(expense)">
            <lucide-icon [img]="icons.Trash2Icon" strokeWidth="1.5"></lucide-icon>
            Supprimer
          </button>
        </MyMenu>
      </Dropdown>

    </div>
  `,
  imports: [
    LucideAngularModule,
    Dropdown,
    Menu,
    IconButton,
    MenuItem
  ],
  standalone: true,
  providers: [ ExpenseDetailsLauncher ],
  selector: 'ExpenseListCard, [ExpenseListCard]'
})
export class ExpenseListCard {
  icons= { EllipsisVerticalIcon, Trash2Icon }

  @Input()
  expense: Expense

  constructor(public readonly detailsLauncher: ExpenseDetailsLauncher) {
  }

  details(expense: Expense) {
    this.detailsLauncher.launch(expense)
  }


  delete(expense: Expense) { }
}
