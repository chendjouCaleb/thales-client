import {Component, Input, OnInit} from "@angular/core";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {Employee} from "@entities/employee";

@Component({
  templateUrl: 'employee-list.html',
  selector: '[employee-list]'
})
export class EmployeeList implements OnInit {
  @Input('employee-list')
  params: any = {}

  employees: Employee[];

  isLoading = true;

  constructor(private _employeeService: EmployeeHttpClient) {
  }

  async ngOnInit() {
    this.reload(this.params).then()
  }

  addEmployees(...employees: Employee[]) {
    this.employees.unshift(...employees);
  }

  async reload(params: any) {
    this.params = params;
    this.isLoading = true;
    this.employees = await this._employeeService.listAsync(this.params);
    this.isLoading = false;
  }
}
