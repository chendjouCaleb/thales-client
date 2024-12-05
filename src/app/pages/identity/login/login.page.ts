import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService, LoginModel, UserService} from "../../../identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'login.page.html'
})
export class LoginPage {
  formGroup = new FormGroup({
    userId: new FormControl('', ),
    password: new FormControl('')
  })

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private _snackbar: MatSnackBar,
              private _router: Router) {
  }

  async login() {
    const value = this.formGroup.value;
    const model = { userId: value.userId,  password: value. password };

    const exists = await this.accountExists();
    if(!exists) return;

    const isValid = await this.checkPassword();
    if(!isValid) return;


    const user = await this.authenticationService.loginAsync(model);
    this._snackbar.open(`Vous êtes maintenant connecté.`, '', {duration: 5000});
    this._router.navigateByUrl(``).then()

  }

  async accountExists(): Promise<boolean> {
    const id = this.formGroup.value.userId;
    const exists = await this.userService.containsAsync(id);

    if(!exists) {
      const message = `Aucun compte ne correspond à l'identifiant: ${id}.`;
      this._snackbar.open(message, '', {duration: 3000, panelClass: ['error-snackbar']});
    }
    return exists;
  }

  async checkPassword(): Promise<boolean> {
    const exists = await this.userService.checkPassword(this.model)

    if(!exists) {
      const message = `Mot de passe incorrect.`;
      this._snackbar.open(message, '', {duration: 3000, panelClass: ['error-snackbar']});
    }
    return exists;
  }


  get model(): LoginModel {
    const value = this.formGroup.value;
    return  { userId: value.userId,  password: value.password };
  }

}
