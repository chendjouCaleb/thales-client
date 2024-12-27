import {Component, OnInit, ViewChild} from "@angular/core";
import {Debt} from "@entities/finance/debt";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {DebtService} from "@app/services/debt.service";
import {DebtAddLauncher} from "@app/Components/debts/add/debt-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {DebtList} from "@app/Components/debts";

@Component({
  templateUrl: 'space-debt-list-page.component.html',
  selector: 'DebtSpaceListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple,
    DebtList,
  ],
  providers: [DebtAddLauncher],
  standalone: true
})
export class SpaceDebtListPage implements OnInit {
  icons = {PlusIcon}
  debts: Debt[] = [];
  displayedColumns: string[] = ['id', 'amount', 'updatedAt', 'reason', 'agency', 'member', 'action'];
  params: any


  debtFilter = (debt: Debt) => {
    return !!debt.debtOwners.find(eo => eo.ownerId == this.space.ownerId)
  }
  space: Space

  constructor(private _service: DebtService,
              //private _uiService: DebtUIService,
              public addLauncher: DebtAddLauncher,
              private parent: AdminPage
  ) {
    this.space = this.parent.space;
    this.params = {ownerId: this.space.ownerId}
  }

  ngOnInit() {

  }

  onClick(row) {
    console.log(row)
  }
}
