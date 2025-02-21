import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, PhoneIcon, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {SpaceEditProfile} from "@app/pages/admin/settings/edit-profile/space-edit-profile";
import {SpaceProfileFormGroup} from "@app/pages/admin/settings/edit-profile/space-profile-form-group";

@Component({
  selector: 'SpaceEditProfileFormPhone, [SpaceEditProfileFormPhone]',
  standalone: true,
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    LucideAngularModule,
    Button,
    MatRipple,
    NgForOf,
    IconButton,
    NgIf,
    Select,
    SelectDropdown,
    SelectField,
    SelectMenu,
    SelectMenuItem,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <div class="display-flex alignItems-center columnGap-16 paddingVertical-16">
        <div class="textStyle-subtitle2 flexGrow-1">Téléphones</div>

        <div>
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addPhone()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter un numéro de téléphone
          </button>
        </div>
      </div>
      <div >
        <div *ngFor="let phone of formGroup.phones; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px" >


          <TextField class="flex-grow-1">
            <label for="phone" TextFieldLabel>Numéro de téléphone</label>
            <input type="tel" TextFieldInput id="phone"
                   [formControl]="phone.controls.value"
            >
          </TextField>

          <button MyIconButton mat-ripple (click)="formGroup.removePhone(phone)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

      </div>
    </div>
  `
})
export class SpaceEditProfileFormPhone {
  icons = { PhoneIcon, PlusIcon, XIcon };
  constructor(public form: SpaceEditProfile) {}

  get formGroup(): SpaceProfileFormGroup {
    return this.form.formGroup
  }
}
