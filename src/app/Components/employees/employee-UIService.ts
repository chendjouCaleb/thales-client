import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {Injectable} from "@angular/core";
import {Employee} from "@entities/employee";
import {Agency} from "@entities/agency";
import {EmployeeSetAdmin} from "./set-admin/employee-set-admin";
import {EmployeeUnsetAdmin} from "./unset-admin/employee-unset-admin";
import {EmployeeDelete} from "@app/Components/employees/delete/employee-delete";
import {Dialog} from "@angular/cdk/dialog";

@Injectable()
export class EmployeeUIService {
  constructor(private _dialog: Dialog) {
  }

  add(agency: Agency): Observable<Employee> {
    const dialogRef = this._dialog.open<Employee>(EmployeeAdd, {
      data: {agency},
      autoFocus: true,
      disableClose: true,
    });
    return dialogRef.closed;
  }

  setAdmin(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(EmployeeSetAdmin, {data: {employee}});
    return dialogRef.closed;
  }

  unsetAdmin(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(EmployeeUnsetAdmin, {data: {employee}});
    return dialogRef.closed;
  }

  delete(employee: Employee): Observable<boolean> {
    const dialogRef = this._dialog.open<boolean>(EmployeeDelete, {autoFocus: false, data: {employee}});
    return dialogRef.closed;
  }
}
