import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResetPasswordState} from "@app/pages/identity/reset-password/reset-password-state";
import {RouterOutlet} from "@angular/router";

@Component({
  templateUrl: 'reset-password.page.html',
  selector: 'ResetPasswordPage',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  providers: [ResetPasswordState]
})
export class ResetPasswordPage {
    constructor(private userService: UserService,
                private snackbar: MatSnackBar) {
    }
}
