import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {Injectable} from "@angular/core";
import {Employee} from "@entities/employee";
import {Agency} from "@entities/agency";

@Injectable()
export class EmployeeUIService {
    constructor(private _dialog: MatDialog) {
    }

    add(agency: Agency): Observable<Employee> {
      const dialogRef = this._dialog.open(EmployeeAdd, {
        data: {agency},
        autoFocus: false,
        disableClose: true,
        panelClass: 'dialog-panel'});
      return dialogRef.afterClosed();
    }
 }
