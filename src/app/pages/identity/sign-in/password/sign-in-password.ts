import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@app/identity";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ArrowLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {MatCheckbox} from "@angular/material/checkbox";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {SignIn} from "@app/pages/identity/sign-in/sign-in";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'sign-in-password.html',
  selector: 'SignInPassword',
  imports: [
    IconButton,
    LucideAngularModule,
    MatCheckbox,
    TextField,
    TextFieldLabel,
    TextFieldInput,
    ReactiveFormsModule,
    Button,
    NgIf
  ],
  standalone: true
})
export class SignInPassword implements OnInit {
  icons = { ArrowLeftIcon }
  inputType = 'password';

  formGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordMatcher: new FormControl('', [Validators.required])
  }, { validators: passwordMatcherValidator });

  get passwordField() {
    return this.formGroup.controls.password;
  }

  get passwordMatcherField() {
    return this.formGroup.controls.passwordMatcher;
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              public parent: SignIn,
              private snackbar: MatSnackBar,
              private userService: UserService) {

  }

  ngOnInit() {
    this.guard()
  }

  changeInputType(visible: boolean) {
    this.inputType = visible ? 'text' : 'password'
  }

  async resetPassword() {
    this.parent.model.password = this.passwordField.value;
    this.parent.addUser()
  }

  back() {
    this.router.navigate(['code'], {relativeTo: this.route.parent}).then()
  }

  guard() {
    if(!this.parent.model.code) {
      this.router.navigate(['code'], {relativeTo: this.parent.route, skipLocationChange: true});
      return false;
    }

    return true;
  }
}


export const passwordMatcherValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordMatcher = control.get('passwordMatcher');
  return password && passwordMatcher && passwordMatcher.value !== password.value ? {passwordMatcher: true} : null;
};
