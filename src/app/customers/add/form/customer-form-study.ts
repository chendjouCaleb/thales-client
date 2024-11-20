import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {
  LucideAngularModule,
  PlusIcon, XIcon, GraduationCapIcon
} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {CustomerInfoModel, Study, Phone} from "@entities/customer";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectField} from "@app/NeoUI/select/select-field";
import {allOccupationLevels} from "../../../../work";
import {allStudyLevels, getStudyLevel} from "../../../../scholar";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";
import {getContactLabel} from "@app/conctact";
import {CleaveModule} from "@app/cleave";

@Component({
  selector: 'CustomerFormStudy, [CustomerFormStudy]',
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
    SelectMenuItem,
    NgIf,
    ReactiveFormsModule,
    CleaveModule
  ],
  template: `
    <div>
      <div class="d-flex align-items-center" style="gap: 16px">
        <lucide-angular [img]="icons.GraduationCapIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Parcours scolaires</div>
      </div>
      <div class="flex-grow-1" style="margin-left: 40px">
        <div *ngFor="let study of formGroup.studies; let i=index"
             class="w-100 d-flex" [class.mt-3]="i != 0" style="gap: 16px">
          <div class="flex-grow-1">
            <div class="d-flex w-100" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="study-schoolName" TextFieldLabel>École</label>
                <input type="text" TextFieldInput id="study-schoolName"
                       [formControl]="study.controls.schoolName"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="discipline" TextFieldLabel>Discipline</label>
                <input type="text" TextFieldInput id="discipline"
                       [formControl]="study.controls.discipline"
                >
              </TextField>
            </div>
            <div class="d-flex w-100 mt-2" style="gap: 16px">


            </div>

            <div class="d-flex w-100 mt-2" style="gap: 16px">
              <TextField class="flex-grow-1">
                <label for="start-at" TextFieldLabel>Année de début</label>
                <input type="text" TextFieldInput id="start-at"
                       [formControl]="study.controls.startAt"
                >
              </TextField>

              <TextField class="flex-grow-1">
                <label for="end-at" TextFieldLabel>Année de fin</label>
                <input type="text" TextFieldInput id="end-at"
                       [formControl]="study.controls.endAt"
                >
              </TextField>
              <MySelect class="flex-grow-1">
                <SelectField #studyLevelField style="width: 100%"
                             [value]="getStudyLevel(study.controls.level.value)"
                             (onChange)="study.controls.level.setValue($event.code)"
                >
                  <span SelectFieldLabel>Niveau de compétence</span>
                  <span *ngIf="studyLevelField.value">{{ studyLevelField.value.name }}</span>
                </SelectField>
                <SelectDropdown #selectStudyLevelDropdown>
                  <MySelectMenu>
                    <button MySelectMenuItem
                            *ngFor="let kind of studyLevels"
                            [checked]="studyLevelField.value?.code == kind.code"
                            (onChange)="studyLevelField.changeValue(kind)"
                            (click)="selectStudyLevelDropdown.close()"
                    >
                      {{ kind.name }}
                    </button>

                  </MySelectMenu>
                </SelectDropdown>
              </MySelect>
            </div>

          </div>

          <button MyIconButton mat-ripple (click)="formGroup.removeStudy(study)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addStudy()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter un parcours scolaire
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormStudy {
  icons = { GraduationCapIcon, PlusIcon, XIcon };
  id = 0

  protected readonly studyLevels = allStudyLevels;

  constructor(public form: CustomerForm) {
  }

  get model(): CustomerInfoModel {
    return this.form.model
  }

  addStudy() {
    let study = new Study();
    study.id = ++this.id;
    this.model.studies.push(study)
  }

  removeStudy(id: number) {
    this.model.studies = this.model.studies.filter(m => m.id != id)
  }

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

  protected readonly getContactLabel = getContactLabel;
  protected readonly getStudyLevel = getStudyLevel;
}
