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
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {SpaceAdd} from "@app/Components/space/add/space-add";
import {SpaceHttpClient} from "@app/services";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";

@Component({
  selector: '[SpaceAddConfirm]',
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
      <div class="fw-semibold ms-2">Confirmation</div>
    </div>


    <div class="fontSize-16 mt-2">
      <div>
        <div class="opacity-8">Identifiant</div>
        <div>&#64;{{model.identifier}}</div>
      </div>

      <div class="mt-3">
        <div class="opacity-8">Nom</div>
        <div>{{model.name}}</div>
      </div>

      <div class="mt-3">
        <div class="opacity-8">Description</div>
        <div>{{model.description}}</div>
      </div>
    </div>



    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading"
              (click)="next()">Créer l'espace
      </button>
    </div>
  `
})
export class SpaceAddConfirm {
  icons = {ChevronLeftIcon}
  isLoading = false;

  get model(): SpaceAddModel {
    return this.parent.model
  }

  constructor(public parent: SpaceAdd,
              private _navHost: NavHost) {
  }

  back() {
    this._navHost.back();
  }

  async next() {
    this.parent.next()
  }


}
