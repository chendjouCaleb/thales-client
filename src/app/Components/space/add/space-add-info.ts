import {Component} from "@angular/core";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {EmployeeAddModel, SpaceAddModel} from "@app/models";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SpaceAdd} from "@app/Components/space/add/space-add";
import {SpaceHttpClient} from "@app/services";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";

@Component({
  selector: 'employee-add-info',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCheckbox,
    ReactiveFormsModule,
    MatButton,
    IconButton,
    LucideAngularModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button
  ],
  template: `

    <div class="d-flex align-items-center">
      <button MyIconButton (click)="back()">
        <lucide-icon [img]="icons.ChevronLeftIcon"></lucide-icon>
      </button>
      <div class="fw-semibold ms-2">&#64;{{ parent.formGroup.controls.identifier }}</div>
    </div>


    <div class="fontSize-16 mt-2">Informations du l'espace</div>
    <TextField class="w-100">
      <label TextFieldLabel for="name-field">Nom de l'espace</label>
      <input TextFieldInput type="text" required [formControl]="formGroup.name" id="name-field">
    </TextField>

    <TextField class="w-100">
      <label TextFieldLabel for="description-field">Description de l'espace</label>
      <input TextFieldInput type="text" required [formControl]="formGroup.description" id="description-field">
    </TextField>


    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading"
              (click)="next()">Ajouter
      </button>
    </div>
  `
})
export class SpaceAddInfo {
  icons = { ChevronLeftIcon }
  isLoading = false;

  get formGroup(): FormGroup {
    return this.parent.formGroup;
  }
  constructor(public parent: SpaceAdd,
              private _navHost: NavHost,
              private _spaceService: SpaceHttpClient,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {}

  back() {
    this._navHost.back();
  }

  async next() {
    const value = this.parent.formGroup.value;
    const model: SpaceAddModel = {
      identifier: value.identifier,
      name: value.name,
      description: value.description
    }

    this.isLoading = true;
    const loaderRef = this._loader.open("Ajout de l'espace...");
    const employee = await this._spaceService.addAsync(model);

    if(employee) {
      this._snackbarBar.open("Votre espace a été crée.", '', {duration: 5000});
      this.parent.dialogRef.close(employee);
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }


}
