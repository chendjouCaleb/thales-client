import {Component, OnInit, ViewChild} from "@angular/core";
import {Income} from "@entities/finance/income";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {IncomeService} from "@app/services/income.service";
import {IncomeAddLauncher} from "@app/Components/incomes/add/income-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {IncomesList} from "@app/Components/incomes";

@Component({
  templateUrl: 'income-list.page.html',
  selector: 'IncomeSpaceListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple,
    IncomesList,
  ],
  providers: [IncomeAddLauncher],
  standalone: true
})
export class IncomeListPage implements OnInit {
  icons = {PlusIcon}
  incomes: Income[] = [];
  displayedColumns: string[] = ['id', 'amount', 'updatedAt', 'reason', 'agency', 'member', 'action'];
  params: any


  incomeFilter = (income: Income) => {
    return !!income.incomeOwners.find(eo => eo.ownerId == this.space.ownerId)
  }
  space: Space

  constructor(private _service: IncomeService,
              //private _uiService: IncomeUIService,
              public addLauncher: IncomeAddLauncher,
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
