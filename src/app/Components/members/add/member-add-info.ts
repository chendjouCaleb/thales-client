import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {EmployeeHttpClient} from "@app/services/employee-http-client.service";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ChevronLeftIcon, LucideAngularModule} from "lucide-angular";
import {Button, IconButton} from "@app/ui";
import {MemberAdd} from "@app/Components/members/add/member-add";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {MemberJobInfo} from "@entities/member";

@Component({
  selector: '[MemberAddInfo]',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCheckbox,
    ReactiveFormsModule,
    MatButton,
    LucideAngularModule,
    Button,
    IconButton,
    TextField,
    TextFieldInput,
    TextFieldLabel
  ],
  template: `

    <div class="d-flex align-items-center">
      <button MyIconButton (click)="back()">
        <lucide-icon [img]="icons.ChevronLeftIcon"></lucide-icon>
      </button>
      <div class="fw-semibold ms-2">Informations sur le poste</div>
    </div>


    <div>
      <TextField class="w-100 mt-2">
        <label for="job-title-field" TextFieldLabel>Poste</label>
        <input type="text" TextFieldInput id="job-title-field">
      </TextField>

      <TextField class="w-100 mt-2">
        <label for="service-name-field" TextFieldLabel>Service</label>
        <input type="text" TextFieldInput id="service-name-field">
      </TextField>

      <TextField class="w-100 mt-2">
        <label for="job-description-field" TextFieldLabel>Description de la mission</label>
        <input type="text" TextFieldInput id="job-description-field">
      </TextField>
    </div>



    <div class="mt-3 align-end">
      <button MyButton color="primary" [disabled]="isLoading"
              (click)="next()">Continuer
      </button>
    </div>
  `
})
export class MemberAddInfo {
  icons = { ChevronLeftIcon }
  isLoading = false;

  jobFormGroup = new FormGroup({
    jobTitle: new FormControl<string>(''),
    serviceName: new FormControl<string>(''),
    jobDescription: new FormControl<string>(''),
  });

  constructor(public parent: MemberAdd,
              private _navHost: NavHost,
              private _employeeHttpClient: EmployeeHttpClient,
              private _userService: UserService,
              private _snackbarBar: MatSnackBar,
              private _loader: SnackbarLoader) {
  }

  back() {
    this._navHost.back();
  }

  async next() {
    const value = this.jobFormGroup.value;
    const jobModel = new MemberJobInfo()
    jobModel.jobDescription = value.jobDescription
    jobModel.jobTitle = value.jobTitle;
    jobModel.serviceName = value.serviceName

    this._navHost.navigateByUrl('confirm');
  }


}
