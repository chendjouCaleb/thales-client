import {Component, inject, Injectable} from "@angular/core";
import {ActivatedRoute, CanActivate, CanActivateFn, Router} from "@angular/router";
import {ResetPasswordState} from "../reset-password-state";
import {ResetPasswordModel, UserService} from "../../../../identity";
import {FormControl, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'reset-password-password.page.html'
})
export class ResetPasswordPasswordPage {
  inputType = 'password';

  formGroup = new FormGroup({
    password: new FormControl(''),
    passwordMatcher: new FormControl('')
  })

  constructor(private state: ResetPasswordState,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar,
              private userService: UserService) {

  }

  changeInputType(visible: boolean) {
    this.inputType = visible ? 'text' : 'password'
  }

  async resetPassword() {
    const model = {
      code: this.state.code,
      userId: this.state.email,
      password: this.formGroup.value.passwordMatcher
    }

    await this.userService.resetPassword(model);
    this.snackbar.open("Mot de passe mis à jour.");
    this.router.navigateByUrl('/identity/login');
    console.log(model)
  }

  back() {
    this.router.navigate(['code'], {relativeTo: this.route.parent}).then()
  }
}



export function ResetPasswordPasswordGuard(): CanActivateFn{
  return () => {
    const state: ResetPasswordState = inject(ResetPasswordState);

    if(state.code.length != 6){
      return false
    }
    return true;
  }
}
