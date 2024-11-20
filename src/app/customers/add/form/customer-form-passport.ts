import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {IdCardIcon, LucideAngularModule, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {allCountries, getCountry} from "../../../../countries";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {CleaveModule} from "@app/cleave";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'CustomerFormPassport, [CustomerFormPassport]',
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
    CleaveModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.IdCardIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Passports</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let passport of formGroup.passports; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px">
          <MySelect class="flex-grow-1">
            <SelectField #selectCountryField style="width: 100%"
                         [value]="getCountry(passport.controls.country.value)"
                         (onChange)="passport.controls.country.setValue($event.code)"
            >
              <span SelectFieldLabel>Pays</span>
              <span *ngIf="selectCountryField.value">{{ selectCountryField.value.name }}</span>
            </SelectField>
            <SelectDropdown #selectCountryDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let country of countries"
                        [checked]="selectCountryField.value?.code == country.code"
                        (onChange)="selectCountryField.changeValue(country)"
                        (click)="selectCountryDropdown.close()"
                >{{ country.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <TextField class="flex-grow-1">
            <label for="issuedAt" TextFieldLabel>Date de délivrance</label>
            <input type="text" TextFieldInput id="issuedAt"
                   CleaveDateInput
                   [formControl]="passport.controls.issuedAt"
            >
          </TextField>

          <TextField class="flex-grow-1">
            <label for="issuedAt" TextFieldLabel>Date d'expiration</label>
            <input type="text" TextFieldInput id="expireAt"
                   CleaveDateInput
                   [formControl]="passport.controls.expireAt"
            >
          </TextField>

          <button MyIconButton mat-ripple (click)="formGroup.removePassport(passport)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addPassport()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter un passport
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormPassport {
  icons = { IdCardIcon, PlusIcon, XIcon };
  protected readonly countries = allCountries;
  protected readonly getCountry = getCountry;

  constructor(public form: CustomerForm) {
  }


  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

}
