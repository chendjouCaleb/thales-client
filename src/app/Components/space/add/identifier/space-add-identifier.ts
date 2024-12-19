import {Component} from "@angular/core";
import {UserService} from "@app/identity";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EmployeeAdd} from "@app/Components/employees/add/employee-add";
import {NavHost} from "@app/navigation";
import {SnackbarLoader} from "@app/Components/snackbar-loader";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {Space} from "@entities/space";
import {SpaceHttpClient} from "@app/services";
import {SpaceAdd} from "@app/Components/space/add/space-add";
import {AlertCircleIcon, LucideAngularModule} from "lucide-angular";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {Task} from "@app/utils";

@Component({
  templateUrl: 'space-add-identifier.html',
  selector: '[SpaceAddIdentifier]',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextField,
    TextFieldInput,
    TextFieldLabel,
    Button,
    LucideAngularModule,
    MatProgressSpinner,
    NgIf
  ]
})
export class SpaceAddIdentifier {
  icons = { AlertCircleIcon }
  isLoading = false
  formControl = new FormControl<string>('')

  constructor(private parent: SpaceAdd,
              private _navHost: NavHost,
              private _spaceService: SpaceHttpClient) {
  }

  async next() {
    this.isLoading = true;
    const contains = await this.checkIdentifierUsed();

    if (!contains) {
      this.parent.model.identifier = this.formControl.value
      this._navHost.navigateByUrl('info');
    }
  }

  async checkIdentifierUsed(): Promise<boolean> {
    await this.checkIdentifierTask.launch()

    if (this.checkIdentifierTask.success && this.checkIdentifierTask.result) {
      return true
    }
    return false
  }

  checkIdentifierTask = new Task<boolean>(async () => {
    const identifier = this.formControl.value;
    return await this._spaceService.containsIdentifierAsync(identifier);
  });
}
