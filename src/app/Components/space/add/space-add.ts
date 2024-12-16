import {Component, Inject} from "@angular/core";
import {MatDialogClose} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NavHost, NavRouteDef} from "@app/navigation";
import {EmployeeAddUser} from "@app/Components/employees/add/employee-add-user";
import {EmployeeAddInfo} from "@app/Components/employees/add/employee-add-info";
import {DIALOG_DATA, DialogRef} from "@angular/cdk/dialog";
import {Space} from "@entities/space";
import {SpaceAddInfo} from "@app/Components/space/add/space-add-info";
import {SpaceAddIdentifier} from "@app/Components/space/add/space-add-identifier";
import {SpaceAddModel} from "@app/models";
import {SpaceHttpClient} from "@app/services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackbarLoader} from "@app/Components";
import {SpaceAddConfirm} from "@app/Components/space/add/space-add-confirm";

@Component({
  templateUrl: 'space-add.html',
  selector: 'SpaceAdd',
  imports: [
    MatIconButton,
    MatDialogClose,
    MatIcon,
    NavHost,
    EmployeeAddUser,
    EmployeeAddInfo,
    NavRouteDef,
    SpaceAddInfo,
    SpaceAddIdentifier,
    SpaceAddConfirm
  ],
  standalone: true
})
export class SpaceAdd {

  model = new SpaceAddModel()
  identifier = new FormControl<string>('')

  constructor(@Inject(DIALOG_DATA) data: any,
              public dialogRef: DialogRef<Space, SpaceAdd>,
              private _spaceService: SpaceHttpClient,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader
  ) {}

  isLoading = false;

  async next() {
    this.isLoading = true;
    const loaderRef = this._loader.open("Ajout de l'espace...");
    const employee = await this._spaceService.addAsync(this.model);

    if (employee) {
      this._snackbarBar.open("Votre espace a été crée.", '', {duration: 5000});
      this.dialogRef.close(employee);
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
