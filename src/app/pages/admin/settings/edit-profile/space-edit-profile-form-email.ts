import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, MailIcon, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {allContactLabels, getContactLabel} from "@app/conctact";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";
import {SpaceEditProfile} from "@app/pages/admin/settings/edit-profile/space-edit-profile";
import {SpaceProfileFormGroup} from "@app/pages/admin/settings/edit-profile/space-profile-form-group";

@Component({
  selector: 'SpaceEditProfileFormEmail, [SpaceEditProfileFormEmail]',
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
      <div class="display-flex alignItems-center paddingVertical-16">
        <div class="textStyle-subtitle2 flexGrow-1">Adresses électroniques</div>
        <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addEmail()">

          <lucide-angular [img]="icons.PlusIcon"></lucide-angular>
          Ajouter une adresse e-mail
        </button>
      </div>
      <div>
        <div *ngFor="let mail of formGroup.emails; let i=index"
             class="width-100 display-flex alignItems-center columnGap-16" [class.marginTop-8]="i != 0">

          <TextField class="flexGrow-1">
            <label [for]="'mail-input-'+ mail.controls.id" TextFieldLabel>Adresse e-mail</label>
            <input type="email" TextFieldInput [id]="'mail-input-'+ mail.controls.id"
                   [formControl]="mail.controls.value"
            >
          </TextField>

          <button MyIconButton mat-ripple (click)="formGroup.removeEmail(mail)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

      </div>
    </div>
  `
})
export class SpaceEditProfileFormEmail {
  icons = { MailIcon, PlusIcon, XIcon };

  constructor(public form: SpaceEditProfile) {}

  get formGroup(): SpaceProfileFormGroup {
    return this.form.formGroup
  }
}
