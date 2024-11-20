import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LucideAngularModule, MapPinIcon, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {Address, CustomerInfoModel} from "@entities/customer";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {allCountries, getCountry} from "../../../../countries";
import {allAddressLabels, getAddressLabel, getContactLabel} from "@app/conctact";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'CustomerFormAddress, [CustomerFormAddress]',
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
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.MapPinIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Adresses</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let address of formGroup.addresses; let i=index"
             class="w-100 d-flex" [class.mt-3]="i != 0" style="gap: 16px">
          <div class="flex-grow-1">
            <div class="d-flex w-100" style="gap: 16px">
              <MySelect style="width: 160px">
                <SelectField #contactKindField style="width: 100%"
                             [value]="getAddressLabel(address.controls.kind.value)"
                             (onChange)="address.controls.kind.setValue($event.code)"
                >
                  <span SelectFieldLabel>Libellé</span>
                  <span *ngIf="contactKindField.value">{{ contactKindField.value.name }}</span>
                </SelectField>
                <SelectDropdown #selectKindDropdown>
                  <MySelectMenu>
                    <button MySelectMenuItem
                            *ngFor="let kind of addressLabels"
                            [checked]="contactKindField.value?.code == kind.code"
                            (onChange)="contactKindField.changeValue(kind)"
                            (click)="selectKindDropdown.close()"
                    >{{ kind.name }}
                    </button>

                  </MySelectMenu>
                </SelectDropdown>
              </MySelect>

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
            <div class="d-flex w-100 mt-2" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="address-region" TextFieldLabel>Région</label>
                <input type="text" TextFieldInput id="address-region"
                       [formControl]="address.controls.region"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="city" TextFieldLabel>Ville</label>
                <input type="text" TextFieldInput id="city"
                       [formControl]="address.controls.city"
                >
              </TextField>
            </div>

            <div class="d-flex w-100 mt-2" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="street" TextFieldLabel>Quartier-Rue</label>
                <input type="text" TextFieldInput id="street"
                       [formControl]="address.controls.street"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="postal-code" TextFieldLabel>Code postal</label>
                <input type="text" TextFieldInput id="postal-code"
                       [formControl]="address.controls.postalCode"
                >
              </TextField>
            </div>

          </div>

          <button MyIconButton mat-ripple (click)="formGroup.removeAddress(address)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addAddress()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter une adresse
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormAddress {
  icons = { MapPinIcon, PlusIcon, XIcon };
  id = 0;
  protected readonly countries = allCountries;

  constructor(public form: CustomerForm) {
  }

  get model(): CustomerInfoModel {
    return this.form.model
  }

  addAddress() {
    let address = new Address();
    address.id = ++this.id;
    this.model.addresses.push(address)
  }

  removeAddress(id: number) {
    this.model.addresses = this.model.addresses.filter(m => m.id != id)
  }

  protected readonly addressLabels = allAddressLabels;
  protected readonly getAddressLabel = getAddressLabel;

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

  protected readonly getCountry = getCountry;
}
