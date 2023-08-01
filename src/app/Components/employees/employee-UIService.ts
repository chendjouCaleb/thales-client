import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {Injectable} from "@angular/core";
import {Employee} from "@entities/employee";
import {Agency} from "@entities/agency";
import {EmployeeSetAdmin} from "./set-admin/employee-set-admin";
import {EmployeeUnsetAdmin} from "./unset-admin/employee-unset-admin";
import {EmployeeDelete} from "@app/Components/employees/delete/employee-delete";

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

  delete(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open(EmployeeDelete, {panelClass: 'dialog-panel', autoFocus: false, data: {employee}});
    return dialogRef.afterClosed();
  }
}
