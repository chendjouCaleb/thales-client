import {Component} from "@angular/core";
import {Dropdown, TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {BabyIcon, CheckIcon, LucideAngularModule, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton, Menu, MenuItem} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {FamilyInfo} from "@entities/customer";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {allCountries, Country} from "../../../../countries";
import {ReactiveFormsModule} from "@angular/forms";
import {CleaveModule} from "@app/cleave";
import {CleaveYearInputDirective} from "@app/cleave/cleave-year-input.directive";

@Component({
  selector: 'CustomerFormFamily, [CustomerFormFamily]',
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
    Menu,
    MenuItem,
    Dropdown,
    NgIf,
    Select,
    SelectDropdown,
    SelectField,
    SelectMenu,
    SelectMenuItem,
    ReactiveFormsModule,
    CleaveModule,
    CleaveYearInputDirective
  ],
  template: `
    <div>
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.BabyIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Situation familiale</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div
          class="w-100 d-flex align-items-center" style="gap: 16px">
          <MySelect class="flex-grow-1">
            <SelectField #maritalStatusField style="width: 100%"
                         [value]="getMaritalStatus(formGroup.family.controls.maritalStatus.value)"
                         (onChange)="formGroup.family.controls.maritalStatus.setValue($event.code)"
            >
              <span SelectFieldLabel>Statut</span>
              <span *ngIf="maritalStatusField.value">{{ maritalStatusField.value.name }}</span>
            </SelectField>
            <SelectDropdown #selectDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let country of maritalStatuses"
                        [checked]="maritalStatusField.value?.code == country.code"
                        (onChange)="maritalStatusField.changeValue(country)"
                        (click)="selectDropdown.close()"
                >{{ country.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <TextField class="flex-grow-1">
            <label for="marriedAt" TextFieldLabel>Année de mariage</label>
            <input  TextFieldInput id="marriedAt" CleaveYearInput
                   [formControl]="formGroup.family.controls.marriedAt"
            >
          </TextField>

          <TextField class="flex-grow-1">
            <label for="issuedAt" TextFieldLabel>Nombre d'enfant</label>
            <input type="number" TextFieldInput id="childrenCount"
                   [formControl]="formGroup.family.controls.childrenCount"
            >
          </TextField>

        </div>
      </div>
    </div>
  `
})
export class CustomerFormFamily {
  icons = { BabyIcon, PlusIcon, XIcon, CheckIcon };
  id = 0

  maritalStatuses = allMaritalStatuses

  selectedStatus: MaritalStatus

  constructor(public form: CustomerForm) {
  }

  get model(): FamilyInfo {
    return this.form.model.family
  }

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

  getMaritalStatus(code: string) {
    return getMaritalStatus(code)
  }
}

const allMaritalStatuses: MaritalStatus[] = [
  {code: 'SINGLE', name: 'Célibataire'},
  {code: 'MARRIED', name: 'Marié'},
  {code: 'DIVORCED', name: 'Divorcé'},
]
export interface MaritalStatus {
  code : string,
  name: string
}

export function getMaritalStatus(code: string) : MaritalStatus {
  if(!code) {
    return null
  }
  return allMaritalStatuses.find(c => c.code == code.toUpperCase())
}
