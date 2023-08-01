import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "@entities/employee";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";

@Component({
  templateUrl: 'employee-delete.html'
})
export class EmployeeDelete {
  employee: Employee

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<EmployeeDelete>,
              private _httpClient: EmployeeHttpClient,
              private _snackbar: MatSnackBar) {
    this.employee = data.employee;
  }

  async delete() {
    await this._httpClient.deleteAsync(this.employee);
    this._dialogRef.close(true);
    this._snackbar.open(`Cet employé a été supprimé.`, '', {duration: 5000})
  }


}
