import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {Injectable} from "@angular/core";
import {Employee} from "@entities/employee";
import {Agency} from "@entities/agency";
import {AgencyDelete} from "@app/Components/agencies/delete/agency-delete";
import {EmployeeSetAdmin} from "@app/Components/employees/set-admin/employee-set-admin";
import {EmployeeUnsetAdmin} from "@app/Components/employees/unset-admin/employee-unset-admin";

@Injectable()
export class EmployeeUIService {
  constructor(private _dialog: MatDialog) {
  }

  add(agency: Agency): Observable<Employee> {
    const dialogRef = this._dialog.open(EmployeeAdd, {
      data: {agency},
      autoFocus: false,
      disableClose: true,
      panelClass: 'dialog-panel'
    });
    return dialogRef.afterClosed();
  }

  setAdmin(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open(EmployeeSetAdmin, {panelClass: 'dialog-panel', data: {employee}});
    return dialogRef.afterClosed();
  }

  unsetAdmin(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open(EmployeeUnsetAdmin, {panelClass: 'dialog-panel', data: {employee}});
    return dialogRef.afterClosed();
  }
}
