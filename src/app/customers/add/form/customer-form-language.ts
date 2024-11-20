import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {LanguagesIcon, LucideAngularModule, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {
  allLanguageDescriptors,
  allLanguageLevels,
  getLanguageDescriptor,
  getLanguageLevel
} from "../../../../languages";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";

@Component({
  selector: 'CustomerFormLang, [CustomerFormLang]',
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
    SelectMenuItem
  ],
  template: `
    <div>
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.LanguagesIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Langues parlées</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let lang of formGroup.langs; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px">
          <MySelect class="flex-grow-1">
            <SelectField #languageField style="width: 100%"
                         [value]="getLanguageDescriptor(lang.controls.name.value)"
                         (onChange)="lang.controls.name.setValue($event.code)"

            >
              <span SelectFieldLabel>Langue</span>
              <span *ngIf="languageField.value">{{ languageField.value.nameFr }}</span>
            </SelectField>
            <SelectDropdown #selectLanguageDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let kind of languageDescriptors"
                        [checked]="languageField.value?.code == kind.code"
                        (onChange)="languageField.changeValue(kind)"
                        (click)="selectLanguageDropdown.close()"
                >
                  <div>{{kind.nameFr}}</div>
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <MySelect class="flex-grow-1">
            <SelectField #languageLevelField style="width: 100%"
                         [value]="getLanguageLevel(lang.controls.level.value)"
                         (onChange)="lang.controls.level.setValue($event.code)"
            >
              <span SelectFieldLabel>Niveau de maîtrise</span>
              <span *ngIf="languageLevelField.value">{{ languageLevelField.value.code }}</span>
            </SelectField>
            <SelectDropdown #selectDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let kind of languageLevels"
                        [checked]="languageLevelField.value?.code == kind.code"
                        (onChange)="languageLevelField.changeValue(kind)"
                        (click)="selectDropdown.close()"
                >
                  <div>
                    <div>{{kind.code}}</div>
                    <div class="fontSize-12">{{kind.title}}</div>
                  </div>
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>

          <button MyIconButton mat-ripple (click)="formGroup.removeLang(lang)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addLang()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter une langue
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormLang {
  icons = { LanguagesIcon, PlusIcon, XIcon };
  protected readonly getLanguageDescriptor = getLanguageDescriptor;
  protected readonly getLanguageLevel = getLanguageLevel;

  constructor(public form: CustomerForm) {
  }

  protected readonly languageLevels = allLanguageLevels;
  protected readonly languageDescriptors = allLanguageDescriptors

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }


}
