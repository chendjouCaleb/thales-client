import {Component, OnInit} from "@angular/core";
import {Agency, Employee} from "@entities/index";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {EmployeeUIService} from "@app/Components/employees";

@Component({
  templateUrl: 'agency-employees.page.html'
})
export class AgencyEmployeesPage implements OnInit {
  employees: Employee[] = [];
  agency: Agency;

  constructor(private _service: EmployeeHttpClient,
              private _parent: AgencyPage,
              private _uiService: EmployeeUIService) {
    this.agency = _parent.agency;
  }

  ngOnInit() {
    this._service.listAsync({agencyId: this.agency.id}).then(items => {
      this.employees = items;
    })
  }

  addEmployee() {
    this._uiService.add(this.agency).subscribe(employee => {
      if (employee) {
        this.employees.unshift(employee);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
