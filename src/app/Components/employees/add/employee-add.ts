import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {User} from "@app/identity";
import {FormControl, FormGroup} from "@angular/forms";
import {Agency} from "@entities/agency";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavHost, NavRouteDef} from "@app/navigation";
import {EmployeeAddUser} from "@app/Components/employees/add/employee-add-user";
import {EmployeeAddInfo} from "@app/Components/employees/add/employee-add-info";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Employee} from "@entities/employee";
import {LucideAngularModule, XIcon} from "lucide-angular";
import {IconButton} from "@app/ui";

@Component({
  templateUrl: 'employee-add.html',
  selector: 'SpaceAdd',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    NavHost,
    EmployeeAddUser,
    EmployeeAddInfo,
    NavRouteDef,
    IconButton,
    LucideAngularModule
  ],
  standalone: true
})
export class EmployeeAdd {
  icons = { XIcon }
  agency: Agency;
  user: User;

  formGroup = new FormGroup({
    userId: new FormControl<string>(''),
    isAdmin: new FormControl(false)
  });

  constructor(@Inject(DIALOG_DATA) data,
              public dialogRef: DialogRef<Employee, EmployeeAdd>) {
    this.agency = data.agency;
  }
}
