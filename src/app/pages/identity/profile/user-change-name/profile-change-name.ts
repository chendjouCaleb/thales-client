import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl} from "@angular/forms";
import {CustomerPickerDialog} from "@app/Components";
import {ProfileService, User, UserService} from "@app/identity";

@Component({
  templateUrl: 'profile-change-name.html'
})
export class ProfileChangeName {
  user: User;

  formControl: FormControl

  constructor(@Inject(MAT_DIALOG_DATA) data,
              private _dialogRef: MatDialogRef<ProfileChangeName>,
              private _service: ProfileService,
              private _snackbar: MatSnackBar) {
    this.user = data.user;
    this.formControl = new FormControl<any>(this.user.fullName)
  }


  async changeName() {
    const value = this.formControl.value;
     await this._service.changeNameAsync(value)
    this._dialogRef.close(value);
    this._snackbar.open(`Le nom a été changé.`, 'Fermer', {duration: 5000})
  }
}
