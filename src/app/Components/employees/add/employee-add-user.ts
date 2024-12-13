import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'employee-add-user',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule
  ],
  template: `
    <div class="fontSize-16">
      Renseignez l'E-mail de l'utilisateur que vous souhaitez ajouter comme employé
    </div>
    <div class="mt-2">
      <mat-form-field class="w-100">
        <input matInput type="text" required [formControl]="formControl" placeholder="E-mail de l'utilisateur">
      </mat-form-field>
    </div>

    <div class="mt-3 align-end">
      <button mat-flat-button color="primary" [disabled]="isLoading || formControl.invalid"
              (click)="next()">Continuer
      </button>
    </div>
  `
})
export class EmployeeAddUser {
  isLoading = false
  get formControl() { return this.parent.formGroup.controls.userId ;}

  constructor(private parent: EmployeeAdd,
              private _navHost: NavHost,
              private _userService: UserService,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  async next() {
    this.isLoading = true;
    const loaderRef = this._loader.open("Recherche de l'utilisateur...");
    const contains = await this._userService.containsByEmailAsync(this.formControl.value);

    if (contains) {
      this.parent.user = await this._userService.getByEmailAsync(this.formControl.value);
      console.log(this.parent.user);
      this._navHost.navigateByUrl('info');
    } else {
      this._snackbarBar.open("Utilisateur introuvable.", 'Fermer', {duration: 5000})
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
