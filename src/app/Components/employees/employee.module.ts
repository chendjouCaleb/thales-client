import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {EmployeeList} from "@app/Components/employees/list/employee-list";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {EmployeeUIService} from "@app/Components/employees/employee-UIService";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {EmployeeAddUser} from "@app/Components/employees/add/employee-add-user";
import {EmployeeAddInfo} from "@app/Components/employees/add/employee-add-info";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {NavigationModule} from "@app/navigation";
import {EmployeeSetAdmin} from "./set-admin/employee-set-admin";
import {EmployeeUnsetAdmin} from "./unset-admin/employee-unset-admin";

@NgModule({
  imports: [CommonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatCheckboxModule,
    MatProgressSpinnerModule, MatStepperModule, ReactiveFormsModule, MatButtonModule, FormsModule, NavigationModule,
    MatIconModule, MatMenuModule, MatRippleModule, NavigationModule],
  declarations: [ EmployeeList, EmployeeAdd, EmployeeAddUser, EmployeeAddInfo, EmployeeSetAdmin, EmployeeUnsetAdmin ],
  exports: [ EmployeeList ],
  providers: [ EmployeeUIService ]
})
export class EmployeeModule {

}
