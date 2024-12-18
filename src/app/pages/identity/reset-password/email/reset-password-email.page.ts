import {Component} from "@angular/core";
import {UserService} from "../../../../identity";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ResetPasswordState} from "../reset-password-state";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Button} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";

@Component({
  templateUrl: 'reset-password-email.page.html',
  selector: 'ResetPasswordEmailPage',
  imports: [
    Button,
    RouterLink,
    TextField,
    TextFieldLabel,
    TextFieldInput,
    ReactiveFormsModule
  ],
  standalone: true
})
export class ResetPasswordEmailPage {
  emailControl: FormControl<string>

  constructor(private userService: UserService,
              private router: Router,
              private state: ResetPasswordState,
              private snackbar: MatSnackBar,
              private route: ActivatedRoute) {
    this.emailControl = new FormControl(state.email, {validators: [ Validators.required ]})
  }


  async next() {
    this.state.email = this.emailControl.value;
    const containsEmail = await this.findEmail(this.emailControl.value);
    if(!containsEmail)  {
      return
    }

    await this.sendResetCode(this.emailControl.value);

    this.router.navigate(['code'], {relativeTo: this.route.parent}).then();
  }

  async findEmail(email: string): Promise<boolean> {
    const snackbarRef = this.snackbar.open("Recherche de l'email.");
    const exists = await this.userService.containsByEmailAsync(email);
    snackbarRef.dismiss();

    if(!exists) {
      const message = "Aucun compte ne correspond à l'e-mail ou de nom d'utilisateur renseigné.";
      this.snackbar.open(message, 'Fermer', {duration: 3000, panelClass: ['error-snackbar']});
    }
    return exists;
  }


  async sendResetCode(userId: string) {
    this.snackbar.open('Envoie du code de réinitialisation...');
    await this.userService.resetPasswordCode(userId);
    this.snackbar.dismiss();
  }
}
