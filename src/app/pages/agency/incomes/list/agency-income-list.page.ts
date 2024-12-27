import {Component, OnInit} from "@angular/core";
import {Income} from "@entities/finance/income";
import {Agency} from "@entities/agency";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {IncomeService} from "@app/services/income.service";
import {IncomeAddLauncher} from "@app/Components/incomes/add/income-add.launcher";
import {Button} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {IncomesList} from "@app/Components/incomes/list/incomes-list";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'agency-income-list.page.html',
  selector: 'AgencyIncomeListPage',
  imports: [
    Button,
    LucideAngularModule,
    MatRipple,
    IncomesList
  ],
  providers: [ IncomeAddLauncher],
  standalone: true
})
export class AgencyIncomeListPage implements OnInit {
  icons = { PlusIcon }
  incomes: Income[] = [];
  displayedColumns: string[] = ['id', 'amount', 'updatedAt', 'reason', 'employee', 'action'];
  params: any

  incomeFilter = (income: Income) => {
    return !!income.incomeOwners.find(eo => eo.ownerId == this.agency.ownerId)
  }

  agency: Agency
  constructor(private _service: IncomeService,
              //private _uiService: IncomeUIService,
              public addLauncher: IncomeAddLauncher,
              private parent: AgencyPage
              ) {
    this.agency = this.parent.agency;
    console.log(this.agency.space)
    this.params = {ownerId: this.agency.ownerId}
  }

  ngOnInit() {

  }

  addIncome() {
    this.addLauncher.addIncome(this.agency.space, this.agency)
  }
}
