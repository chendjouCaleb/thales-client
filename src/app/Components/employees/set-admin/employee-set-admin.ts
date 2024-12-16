import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "@entities/employee";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {MatButton} from "@angular/material/button";

@Component({
  templateUrl: 'employee-set-admin.html',
  selector: 'MemberLock',
  imports: [
    MatButton,
    MatDialogClose
  ],
  standalone: true
})
export class EmployeeSetAdmin {
  employee: Employee

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<EmployeeSetAdmin>,
              private _httpClient: EmployeeHttpClient,
              private _snackbar: MatSnackBar) {
    this.employee = data.employee;
  }

  async setAdmin() {
    await this._httpClient.setAdminAsync(this.employee);
    this.employee.isAdmin = true;
    this._dialogRef.close(true);
    this._snackbar.open(`Cet employé est maintenant un administrateur.`, '', {duration: 5000})
  }
}
