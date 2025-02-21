import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, MapPinIcon, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {Select} from "@app/NeoUI/select/select";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {allAddressLabels, getAddressLabel} from "@app/conctact";
import {ReactiveFormsModule} from "@angular/forms";
import {SpaceEditProfile} from "@app/pages/admin/settings/edit-profile/space-edit-profile";
import {SpaceProfileFormGroup} from "@app/pages/admin/settings/edit-profile/space-profile-form-group";
import {allCountries, getCountry} from "../../../../../countries";

@Component({
  selector: 'SpaceEditProfileFormAddress, [SpaceEditProfileFormAddress]',
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
    Select,
    SelectField,
    SelectDropdown,
    SelectMenu,
    NgIf,
    SelectMenuItem,
    ReactiveFormsModule
  ],
  template: `
    <div>
      <div class="textStyle-subtitle2">Adresse</div>
      <div class="flex-grow-1">
        <div class="d-flex w-100" style="gap: 16px">


          <MySelect class="flex-grow-1">
            <SelectField #selectCountryField style="width: 100%"
                         [value]="getCountry(address.controls.country.value)"
                         (onChange)="address.controls.country.setValue($event.code)"
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
        </div>
        <div class="display-flex width-100 marginTop-16 columnGap-16">
          <TextField class="flexGrow-1">
            <label for="address-region" TextFieldLabel>Région</label>
            <input type="text" TextFieldInput id="address-region"
                   [formControl]="address.controls.region"
            >
          </TextField>

          <TextField class="flexGrow-1">
            <label for="city" TextFieldLabel>Ville</label>
            <input type="text" TextFieldInput id="city"
                   [formControl]="address.controls.city"
            >
          </TextField>
        </div>

        <div class="display-flex width-100 marginTop-16 columnGap-16">
          <TextField class="flexGrow-1">
            <label for="street" TextFieldLabel>Quartier-Rue</label>
            <input type="text" TextFieldInput id="street"
                   [formControl]="address.controls.street"
            >
          </TextField>

          <TextField class="flexGrow-1">
            <label for="postal-code" TextFieldLabel>Code postal</label>
            <input type="text" TextFieldInput id="postal-code"
                   [formControl]="address.controls.postalCode"
            >
          </TextField>
        </div>

      </div>

    </div>
  `
})
export class SpaceEditProfileFormAddress {
  icons = {MapPinIcon, PlusIcon, XIcon};

  protected readonly countries = allCountries;
  protected readonly addressLabels = allAddressLabels;
  protected readonly getAddressLabel = getAddressLabel;

  get formGroup(): SpaceProfileFormGroup {
    return this.parent.formGroup
  }

  get address() {
    return this.parent.formGroup.address
  }

  constructor(public parent: SpaceEditProfile) {
  }

  protected readonly getCountry = getCountry;
}
