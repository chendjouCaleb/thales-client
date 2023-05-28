import {Component} from "@angular/core";
import {UserService} from "../../../identity";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'reset-password.page.html'
})
export class ResetPasswordPage {
    constructor(private userService: UserService,
                private snackbar: MatSnackBar) {
    }



}
