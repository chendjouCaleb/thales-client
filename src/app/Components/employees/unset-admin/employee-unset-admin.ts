import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "@entities/employee";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";

@Component({
  templateUrl: 'employee-unset-admin.html'
})
export class EmployeeUnsetAdmin {
  employee: Employee

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<EmployeeUnsetAdmin>,
              private _httpClient: EmployeeHttpClient,
              private _snackbar: MatSnackBar) {
    this.employee = data.employee;
  }

  async setAdmin() {
    await this._httpClient.unSetAdminAsync(this.employee);
    this._dialogRef.close(true);
    this._snackbar.open(`Cet employé n'est plus un administrateur.`, '', {duration: 5000})
  }
}
