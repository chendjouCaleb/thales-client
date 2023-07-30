import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "@app/identity";
import {FormControl, FormGroup} from "@angular/forms";
import {Agency} from "@entities/agency";

@Component({
  templateUrl: 'employee-add.html'
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
