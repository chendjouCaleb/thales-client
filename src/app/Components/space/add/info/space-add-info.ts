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
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpaceAdd} from "@app/Components/space/add/space-add";
import {SpaceHttpClient} from "@app/services";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {NgIf} from "@angular/common";

@Component({
  selector: '[SpaceAddInfo]',
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
    Button,
    NgIf
  ],
  templateUrl: 'space-add-info.html'
})
export class SpaceAddInfo {
  icons = {ChevronLeftIcon}
  isLoading = false;

  formGroup = new FormGroup({
    name: new FormControl<string>('', [ Validators.minLength(3), Validators.required]),
    description: new FormControl<string>('')
  });

  get nameField() {
    return this.formGroup.controls.name
  }

  get model(): SpaceAddModel {
    return this.parent.model
  }

  constructor(public parent: SpaceAdd,
              private _navHost: NavHost,
              private _spaceService: SpaceHttpClient,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  back() {
    this._navHost.back();
  }

  async next() {
    const value = this.formGroup.value;

    this.model.description = value.description;
    this.model.name = value.name

    this._navHost.navigateByUrl('confirm')
  }


}
