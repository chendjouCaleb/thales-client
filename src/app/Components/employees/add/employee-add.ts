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

@Component({
  templateUrl: 'employee-add.html',
  selector: 'EmployeeAdd',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    NavHost,
    EmployeeAddUser,
    EmployeeAddInfo,
    NavRouteDef
  ],
  standalone: true
})
export class EmployeeAdd {
  agency: Agency;
  user: User;

  formGroup = new FormGroup({
    userId: new FormControl<string>(''),
    isAdmin: new FormControl(false)
  });

  constructor(@Inject(MAT_DIALOG_DATA) data,
              public dialogRef: MatDialogRef<EmployeeAdd>) {
    this.agency = data.agency;
  }
}
