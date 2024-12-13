import {Component, Input, OnInit} from "@angular/core";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {Employee} from "@entities/employee";
import {EmployeeUIService} from "@app/Components";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatRipple} from "@angular/material/core";

@Component({
  templateUrl: 'employee-list.html',
  selector: '[employee-list], EmployeeList',
  imports: [
    MatProgressSpinner,
    NgIf,
    NgForOf,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon,
    MatRipple
  ],
  standalone: true
})
export class EmployeeList implements OnInit {
  @Input()
  params: any = {}

  employees: Employee[];

  isLoading = true;

  constructor(private _employeeService: EmployeeHttpClient,
              private uiService: EmployeeUIService) {
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

  setAdmin(employee: Employee) {
    this.uiService.setAdmin(employee);
  }

  unsetAdmin(employee: Employee) {
    this.uiService.unsetAdmin(employee);
  }

  delete(employee: Employee) {
    this.uiService.delete(employee).subscribe(deleted => {
      if(deleted) {
        this.employees = this.employees.filter(e => e.id != employee.id);
      }
    });
  }
}
