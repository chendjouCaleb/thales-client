import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {
  LucideAngularModule,
  UserRoundIcon,
} from 'lucide-angular';
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {CustomerInfoModel} from "@entities/customer";
import {allCountries, getCountry} from "../../../../countries";
import {Select} from "@app/NeoUI/select/select";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {NgForOf, NgIf} from "@angular/common";
import {allSexes, getSex, Sex} from "../../../../human";
import {ReactiveFormsModule} from "@angular/forms";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {CleaveModule} from "@app/cleave";

@Component({
  selector: 'CustomerFormPerson, [CustomerFormPerson]',
  standalone: true,
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    LucideAngularModule,
    Select,
    SelectField,
    SelectDropdown,
    SelectMenu,
    SelectMenuItem,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CleaveModule
  ],
  template: `
    <div>
      <div class="d-flex align-items-center mb-1" style="gap: 16px">
        <lucide-angular [img]="userIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Informations personnelles</div>
      </div>

      <div class="flex-grow-1" style="margin-left: 40px">
        <div style="display: flex; gap: 16px; ">
          <TextField class="flex-grow-1">
            <label for="firstName" TextFieldLabel>Nom</label>
            <input type="text" TextFieldInput id="firstName"
                   [formControl]="formGroup.firstName"

            >
          </TextField>
          <TextField class="flex-grow-1">
            <label for="lastName" TextFieldLabel>Prénom</label>
            <input type="text" TextFieldInput id="lastName"
                   [formControl]="formGroup.lastName"
            >
          </TextField>
        </div>

        <div class="w-100 d-flex pt-3" style="gap: 16px">
          <TextField class="flex-grow-1">
            <label for="birthDate" TextFieldLabel>Date de naissance</label>
            <input type="text" TextFieldInput id="birthDate"
                   CleaveDateInput
                   [formControl]="formGroup.birthDate"

            >
          </TextField>

          <TextField class="flex-grow-1">
            <label for="birthPlace" TextFieldLabel>Lieu de naissance</label>
            <input type="text" TextFieldInput id="birthPlace"
                   [formControl]="formGroup.birthPlace"
            >
          </TextField>

        </div>

        <div class="w-100 d-flex pt-3" style="gap: 16px">

          <MySelect class="flex-grow-1">
            <SelectField #sexField style="width: 100%"
                         [value]="getSex(formGroup.sex.value)"
                         (onChange)="formGroup.sex.setValue($event.code)"
            >
              <span SelectFieldLabel>Sexe</span>
              <span *ngIf="sexField.value">{{ sexField.value.name }}</span>
            </SelectField>
            <SelectDropdown #sexFieldDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let sex of sexes"
                        [checked]="sexField.value?.code == sex.code"
                        (onChange)="sexField.changeValue(sex)"
                        (click)="sexFieldDropdown.close()"
                >{{ sex.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <MySelect class="flex-grow-1">
            <SelectField #selectField style="width: 100%"
                         [value]="getCountry(formGroup.nationality.value)"
                         (onChange)="formGroup.nationality.setValue($event.code)"
            >
              <span SelectFieldLabel>Nationalité</span>
              <span *ngIf="selectField.value">{{ selectField.value.name }}</span>
            </SelectField>
            <SelectDropdown #selectDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let country of countries"
                        [checked]="selectField.value?.code == country.code"
                        (onChange)="selectField.changeValue(country)"
                        (click)="selectDropdown.close()"
                >{{ country.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <!--          <TextField >-->
          <!--            <label for="nationality" TextFieldLabel>Nationalité</label>-->
          <!--            <input type="text" TextFieldInput id="nationality"-->
          <!--                   [value]="model.nationality"-->
          <!--                   (onChange)="model.nationality=$event"-->
          <!--            >-->
          <!--          </TextField>-->
        </div>
      </div>
    </div>
  `
})
export class CustomerFormPerson {
  userIcon = UserRoundIcon

  constructor(public form: CustomerForm) {
  }

  countries = allCountries
  sexes = allSexes

  get model(): CustomerInfoModel {
    return this.form.model
  }

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

  getSex(code: string): Sex {
    return getSex(code)
  }

  getCountry(code: string) {
    return getCountry(code)
  }
}
