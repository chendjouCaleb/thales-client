import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {Space} from "@entities/space";
import {SpaceHttpClient} from "@app/services";
import {SpaceAdd} from "@app/Components/space/add/space-add";

@Component({
  selector: 'employee-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button
  ],
  template: `
    <div class="fontSize-16">
      Renseignez l'identifiant de votre espace
    </div>
    <div class="mt-2">
      <TextField class="w-100">
        <label TextFieldLabel for="identifier-field">"E-mail de l'utilisateur"</label>
        <input TextFieldInput type="text" required [formControl]="formControl" id="identifier-field">
      </TextField>
    </div>

    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading || formControl.invalid"
              (click)="next()">Continuer
      </button>
    </div>
  `
})
export class SpaceAddIdentifier {
  isLoading = false
  get formControl() { return this.parent.formGroup.controls.identifier; }

  constructor(private parent: SpaceAdd,
              private _navHost: NavHost,
              private _spaceService: SpaceHttpClient,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  async next() {
    this.isLoading = true;
    const loaderRef = this._loader.open("Vérification de l'identifiant...");
    const contains = await this._spaceService.containsIdentifierAsync(this.formControl.value);

    if (contains) {
      this._snackbarBar.open("Identifiant déjà utilisé par un autre espace.", 'Fermer', {duration: 5000});
    } else {
      this._navHost.navigateByUrl('info');
    }

    loaderRef.dismiss();
    this.isLoading = false;
  }
}
