import {Component, inject} from "@angular/core";
import {ResetPasswordState} from "../reset-password-state";
import {ActivatedRoute, CanActivateFn, Router} from "@angular/router";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {FormsModule} from "@angular/forms";

@Component({
  templateUrl: 'reset-password-code.page.html',
  selector: 'ResetPasswordCodePage',
  imports: [
    Button,
    TextField,
    TextFieldLabel,
    TextFieldInput,
    FormsModule,
    LucideAngularModule,
    IconButton
  ],
  standalone: true
})
export class ResetPasswordCodePage {
  icons = { ChevronLeftIcon }
  email: string;
  code: string = '';

  constructor(private state: ResetPasswordState,
              private router: Router,
              private snackbar: MatSnackBar,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.email = state.email;
    this.code = state.code;
  }

  async next() {
    this.state.code = this.code;
    const isValid = await this.checkCodeAsync();
    if(!isValid) {
      return;
    }
    this.router.navigate(['password'], {relativeTo: this.route.parent}).then();
  }

  async checkCodeAsync(): Promise<boolean> {
    const model = {code: this.code, userId: this.email }
    const isValid = await this.userService.checkResetPasswordCode(model);
    if(!isValid) {
      const message = "Code de réinitialisation invalide.";
      this.snackbar.open(message, '', {duration: 3000, panelClass: ['error-snackbar']});
    }
    return isValid;
  }

  async sendCode($event) {
    $event.preventDefault()
    await this.userService.resetPasswordCode(this.state.email);
    this.snackbar.open('Code de réinitialisation envoyé !');
  }

  back() {
    this.router.navigate(['email'], {relativeTo: this.route.parent}).then()
  }
}




export function ResetPasswordCodeGuard(): CanActivateFn{
  return () => {
    const state: ResetPasswordState = inject(ResetPasswordState);
    const isValid = !!state.email
    if(!isValid) {
      console.warn("State email is required");
    }

    return isValid;

  }
}
