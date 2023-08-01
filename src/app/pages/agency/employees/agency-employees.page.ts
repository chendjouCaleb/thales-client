import {Component, OnInit, ViewChild} from "@angular/core";
import {Agency, Employee} from "@entities/index";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {EmployeeList} from "@app/Components/employees/list/employee-list";
import {EmployeeUIService} from "@app/Components/employees/employee-UIService";

@Component({
  templateUrl: 'agency-employees.page.html'
})
export class AgencyEmployeesPage implements OnInit {
  @ViewChild(EmployeeList)
  employeeList: EmployeeList

  agency: Agency;

  constructor(private _service: EmployeeHttpClient,
              private _parent: AgencyPage,
              private _uiService: EmployeeUIService) {
    this.agency = _parent.agency;
  }

  ngOnInit() {

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
