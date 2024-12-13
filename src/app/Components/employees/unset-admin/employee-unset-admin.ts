import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "@entities/employee";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'employee-unset-admin.html',
  selector: 'EmployeeUnsetAdmin',
  imports: [],
  standalone: true
})
export class EmployeeUnsetAdmin {
  employee: Employee

  constructor(@Inject(DIALOG_DATA) data: any,
              public _dialogRef: DialogRef<boolean, EmployeeUnsetAdmin>,
              private _httpClient: EmployeeHttpClient,
              private _snackbar: MatSnackBar) {
    this.employee = data.employee;
  }

  async unsetAdmin() {
    await this._httpClient.unSetAdminAsync(this.employee);
    this.employee.isAdmin = false;
    this._dialogRef.close(true);
    this._snackbar.open(`Cet employé n'est plus un administrateur.`, '', {duration: 3000})
  }
}
