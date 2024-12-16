import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {TextField, TextFieldInput} from "@app/NeoUI";
import {Button} from "@app/ui";
import {MatCheckbox} from "@angular/material/checkbox";
import {Task} from "@app/utils";
import {MemberAdd} from "@app/Components/members/add/member-add";
import {MemberAddModel} from "@app/models";

@Component({
  selector: '[MemberAddConfirm]',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatButton,
    ReactiveFormsModule,
    TextField,
    Button,
    TextFieldInput,
    MatCheckbox
  ],
  template: `
    <div class="fontSize-16">
      Confirmation
    </div>
    <div class="opacity-8">
      Confirmer ces renseignements
    </div>


    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading "
              (click)="next()">Ajouter
      </button>
    </div>
  `
})
export class MemberAddConfirm {
  isLoading = false

 get model(): MemberAddModel {
    return this.parent.model
 }

  constructor(public readonly parent: MemberAdd,
              private _navHost: NavHost,
              private _userService: UserService,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  checkUserAsync = new Task(async () => {

  })

  async next() {
  }
}