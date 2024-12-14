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
import {Space} from "@entities/space";

@Component({
  templateUrl: 'space-add.html',
  selector: 'SpaceAdd',
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
export class SpaceAdd {

  formGroup = new FormGroup({
    identifier: new FormControl<string>(''),
    name: new FormControl<string>(''),
    description: new FormControl<string>('')
  });

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<Space, SpaceAdd>) { }
}
