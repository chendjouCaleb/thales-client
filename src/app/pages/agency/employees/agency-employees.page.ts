import {Component, OnInit, ViewChild} from "@angular/core";
import {Agency, Employee} from "@entities/index";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {EmployeeList} from "@app/Components/employees/list/employee-list";
import {EmployeeUIService} from "@app/Components/employees/employee-UIService";
import {BreadcrumbItem} from "@app/Components";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  templateUrl: 'agency-employees.page.html',
  selector: 'AgencyEmployeesPage',
  imports: [
    EmployeeList,
    MatIcon,
    MatButton
  ],
  standalone: true
})
export class AgencyEmployeesPage implements OnInit {
  @ViewChild(EmployeeList)
  employeeList: EmployeeList

  agency: Agency;

  breadcrumbItems: BreadcrumbItem[]

  constructor(private _service: EmployeeHttpClient,
              private _parent: AgencyPage,
              private _uiService: EmployeeUIService) {
    this.agency = _parent.agency;
  }

  ngOnInit() {
    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Employés de l\'agence')
    ];
  }

  addEmployee() {
    this._uiService.add(this.agency).subscribe(employee => {
      if (employee) {
        this.employeeList.addEmployees(employee);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
