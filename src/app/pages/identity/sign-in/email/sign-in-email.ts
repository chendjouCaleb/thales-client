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
  templateUrl: 'sign-in-email.html',
  selector: 'SignIInEmail',
  imports: [
    Button,
    IconButton,
    LucideAngularModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    MatProgressSpinner,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class SignInEmail implements OnInit {
  icons = {ArrowLeftIcon, AlertCircleIcon}

  formControl = new FormControl('');

  constructor(public readonly parent: SignIn,
              private readonly _router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.guard()
  }

  async next() {
    const email = this.formControl.value;

    const isUsed = await this.checkEmailUsed();
    this.parent.model.email = email;

    if (!isUsed) {
      this.parent.sendCodeAsync()
      this._router.navigate(['code'], {relativeTo: this.parent.route})
    }

  }

  async checkEmailUsed(): Promise<boolean> {
    await this.checkEmailTask.launch()

    if (this.checkEmailTask.success && this.checkEmailTask.result) {
      return true
    }
    return false
  }

  checkEmailTask = new Task<boolean>(async () => {
    const email = this.formControl.value;
    return await this.userService.containsByEmailAsync(email);
  });

  back() {
    this._router.navigate(['info'], {relativeTo: this.route.parent}).then()
  }

  guard() {
    if(!this.parent.model.fullName) {
      this._router.navigate(['info'], {relativeTo: this.parent.route, replaceUrl: true});
      console.log('Redirect to ', 'signin/info')
      return false;
    }

    return true;
  }
}
