import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {BriefcaseBusinessIcon, LucideAngularModule, PlusIcon, XIcon} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {allOccupationLevels, getOccupationLevel} from "../../../../work";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'CustomerFormOccupation, [CustomerFormOccupation]',
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
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.BriefcaseBusinessIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Qualifications professionnelles</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let occupation of formGroup.occupations; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px">

          <TextField class="flex-grow-1">
            <label for="name" TextFieldLabel>Qualification</label>
            <input type="text" TextFieldInput id="name"
                   [formControl]="occupation.controls.name"
            >
          </TextField>


          <MySelect class="flex-grow-1">
            <SelectField #occupationLevelField style="width: 100%"
                         [value]="getOccupationLevel(occupation.controls.level.value)"
                         (onChange)="occupation.controls.level.setValue($event.code)"
            >
              <span SelectFieldLabel>Niveau de compétence</span>
              <span *ngIf="occupationLevelField.value">{{ occupationLevelField.value.name }}</span>
            </SelectField>
            <SelectDropdown #selectOccupationLevelDropdown>
              <MySelectMenu>
                <button MySelectMenuItem
                        *ngFor="let kind of languageLevels"
                        [checked]="occupationLevelField.value?.code == kind.code"
                        (onChange)="occupationLevelField.changeValue(kind)"
                        (click)="selectOccupationLevelDropdown.close()"
                >
                  {{ kind.name }}
                </button>

              </MySelectMenu>
            </SelectDropdown>
          </MySelect>


          <button MyIconButton mat-ripple (click)="formGroup.removeOccupation(occupation)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addOccupation()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter une qualification
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormOccupation {
  icons = {  BriefcaseBusinessIcon, PlusIcon, XIcon };
  protected readonly languageLevels = allOccupationLevels;
  protected readonly getOccupationLevel = getOccupationLevel;

  constructor(public form: CustomerForm) {
  }


  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }


}
