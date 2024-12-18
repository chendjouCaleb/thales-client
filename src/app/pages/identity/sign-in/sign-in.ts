import {Component} from "@angular/core";
import {Button, IconButton} from "@app/ui";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {SignInModel, User, UserService} from "@app/identity";
import {Task} from "@app/utils";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  templateUrl: 'sign-in.html',
  selector: 'SignIn',
  standalone: true,

  imports: [
    IconButton,
    LucideAngularModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button,
    RouterOutlet,
    MatProgressSpinner
  ]
})
export class SignIn {
  icons = { ChevronLeftIcon }
  model = new SignInModel()

  constructor(public route: ActivatedRoute,
              private userService: UserService,
              private snackbar: MatSnackBar,
              private router: Router
              ) {
  }

  async sendCodeAsync() {
    await this.sendCodeTask.launch()
  }

  sendCodeTask = new Task(async () => {
    await this.userService.signInCode(this.model.email)
  });

  async addUser() {
    await this.addUserTask.launch();
    if(this.addUserTask.success) {
      this.snackbar.open('Votre compte a correctement été crée. Vous pouvez à présent vous connecter.');
      this.router.navigate(['identity', 'login'])
    }
  }

  addUserTask = new Task<User>(async () => {
    return await this.userService.addAsync(this.model);
  })
}
