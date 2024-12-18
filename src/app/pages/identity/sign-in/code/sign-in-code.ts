import {Component, OnInit} from "@angular/core";
import {Button, IconButton} from "@app/ui";
import {AlertCircleIcon, ArrowLeftIcon, LucideAngularModule} from "lucide-angular";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {SignIn} from "@app/pages/identity/sign-in/sign-in";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "@app/identity";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'sign-in-code.html',
  selector: 'SignIInCode',
  imports: [
    Button,
    IconButton,
    LucideAngularModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    ReactiveFormsModule,
    MatProgressSpinner,
    NgIf
  ],
  standalone: true
})
export class SignInCode implements  OnInit {
  icons = { ArrowLeftIcon, AlertCircleIcon }

  formControl = new FormControl('');

  constructor(public readonly parent: SignIn,
              private readonly _router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
        this.guard()
    }

  async next() {
    const code = this.formControl.value;
    this.parent.model.code = code;

    const isValid = await this.checkCode()

    if (isValid) {
      this._router.navigate(['password'], {relativeTo: this.parent.route})
    }

  }

  async checkCode(): Promise<boolean> {
    await this.checkCodeTask.launch()

    if (this.checkCodeTask.success && this.checkCodeTask.result) {
      return true
    }
    return false
  }

  checkCodeTask = new Task<boolean>(async () => {
    const code = this.formControl.value;
    const userId = this.parent.model.email
    return await this.userService.checkSignInCode({code, userId});
  });

  back() {
    this._router.navigate(['email'], {relativeTo: this.route.parent}).then()
  }

  guard() {
    if(!this.parent.model.email) {
      this._router.navigate(['email'], {relativeTo: this.parent.route });
      return false;
    }

    return true;
  }
}
