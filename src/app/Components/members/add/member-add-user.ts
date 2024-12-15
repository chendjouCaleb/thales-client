import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {Button} from "@app/ui";
import {MatCheckbox} from "@angular/material/checkbox";
import {Task} from "@app/utils";
import {MemberAdd} from "@app/Components/members/add/member-add";

@Component({
  selector: '[MemberAddUser]',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    TextField,
    Button,
    TextFieldInput,
    MatCheckbox
  ],
  template: `
    <div class="fontSize-16">
      Utilisateur
    </div>
    <div class="opacity-8">
      Renseignez l'E-mail de l'utilisateur que vous <br> souhaitez ajouter comme membre
    </div>
    <div [formGroup]="formGroup">
      <div class="mt-2">
        <TextField class="w-100">
          <input TextFieldInput type="text" required formControlName="userId" placeholder="E-mail de l'utilisateur">
        </TextField>
      </div>

      <div class="mt-2">
        <mat-checkbox color="primary" formControlName="isAdmin"> Administrateur</mat-checkbox>
      </div>
    </div>

    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading || formGroup.invalid"
              (click)="next()">Continuer
      </button>
    </div>
  `
})
export class MemberAddUser {
  isLoading = false

  formGroup = new FormGroup({
    userId: new FormControl<string>(''),
    isAdmin: new FormControl(false)
  });

  constructor(public readonly parent: MemberAdd,
              private _navHost: NavHost,
              private _userService: UserService,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  checkUserAsync = new Task(async () => {

  })

  async next() {
    const value = this.formGroup.value;
    this.isLoading = true;
    const loaderRef = this._loader.open("Recherche de l'utilisateur...");
    const contains = await this._userService.containsByEmailAsync(value.userId);

    if (contains) {
      this.parent.user = await this._userService.getByEmailAsync(value.userId);
      console.log(this.parent.user);
      this.parent.model.userId = value.userId;
      this.parent.model.isAdmin = value.isAdmin;
      this._navHost.navigateByUrl('info');
    } else {
      this._snackbarBar.open("Utilisateur introuvable.", 'Fermer', {duration: 5000})
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
