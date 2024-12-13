import {Component} from "@angular/core";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {EmployeeAddModel} from "@app/models";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'employee-add-info',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCheckbox,
    ReactiveFormsModule,
    MatButton
  ],
  template: `

    <div class="d-flex align-items-center">
      <button mat-icon-button (click)="back()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <div class="fw-semibold ms-2">{{ parent.user.fullName }}</div>
    </div>


    <div class="fontSize-16 mt-2">Sélectionnez les droits de ce membre.</div>
    <div class="mt-2">
      <mat-checkbox color="primary" [formControl]="parent.formGroup.controls.isAdmin"> Administrateur</mat-checkbox>
    </div>


    <div class="mt-3 align-end">
      <button mat-flat-button color="primary" [disabled]="isLoading"
              (click)="next()">Ajouter
      </button>
    </div>
  `
})
export class EmployeeAddInfo {
  isLoading = false;
  constructor(public parent: EmployeeAdd,
              private _navHost: NavHost,
              private _employeeHttpClient: EmployeeHttpClient,
              private _userService: UserService,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  back() {
    this._navHost.back();
  }

  async next() {
    const value = this.parent.formGroup.value;
    const model: EmployeeAddModel = {
      userId: this.parent.user.id,
      isAdmin: value.isAdmin
    }

    this.isLoading = true;
    const loaderRef = this._loader.open("Ajout de l'employé...");
    const employee = await this._employeeHttpClient.addAsync(this.parent.agency, model);

    if(employee) {
      this._snackbarBar.open("Employé correctement ajouté.", '', {duration: 5000});
      this.parent.dialogRef.close(employee);
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }


}
