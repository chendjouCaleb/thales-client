import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, PhoneIcon, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {allContactLabels, getContactLabel} from "@app/conctact";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";

@Component({
  selector: 'CustomerFormPhone, [CustomerFormPhone]',
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
      <div class="d-flex align-items-center mb-1" style="gap: 16px">
        <lucide-angular [img]="icons.PhoneIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Téléphones</div>
      </div>
      <div style="margin-left: 40px">
        <div *ngFor="let phone of formGroup.phones; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px" >
          <MySelect style="width: 160px">
            <SelectField #contactKindField style="width: 100%"
                         [value]="getContactLabel(phone.controls.kind.value)"
                         (onChange)="phone.controls.kind.setValue($event.code)"

            >
              <span SelectFieldLabel>Libellé</span>
              <span *ngIf="contactKindField.value">{{ contactKindField.value.name }}</span>
            </SelectField>
            <SelectDropdown #selectDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let kind of contactKinds"
                        [checked]="contactKindField.value?.code == kind.code"
                        (onChange)="contactKindField.changeValue(kind)"
                        (click)="selectDropdown.close()"
                >{{ kind.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

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

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addPhone()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter un numméro de téléphone
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormPhone {
  icons = { PhoneIcon, PlusIcon, XIcon };
  protected readonly contactKinds = allContactLabels;
  protected readonly getContactLabel = getContactLabel;

  constructor(public form: CustomerForm) {
  }


  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }
}
