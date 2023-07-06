import {Component, ViewChild} from "@angular/core";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {UserService} from "../../../../identity/user.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'user-add.page.html'
})
export class UserAddPage {
  @ViewChild('formDirective') private formDirective: NgForm;

  formGroup = new FormGroup({
    email: new FormControl('', ),
    fullName: new FormControl('')
  })

  constructor(private userService: UserService,
              private _snackbar: MatSnackBar,
              private _router: Router) {
  }

  async addUser() {
    const value = this.formGroup.value;
    const model = { fullName: value.fullName, email: value.email };

    const user = await this.userService.addAsync(model);
    this.formDirective.resetForm();
    this.formGroup.reset()
    this._snackbar.open(`L'utilisateur ${user.fullName} a été ajouté.`, 'VOIR').onAction().subscribe(() => {
      this._router.navigateByUrl(`/admin/users/${user.userName}/home`)
    })

  }
}
