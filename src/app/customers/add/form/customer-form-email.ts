import {Component} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {
  LucideAngularModule,
  PlusIcon, MailIcon, XIcon, UserRoundIcon
} from 'lucide-angular';
import {Button, IconButton} from "@app/ui";
import {MatRipple} from "@angular/material/core";
import {CustomerInfoModel, Email} from "@entities/customer";
import {NgForOf, NgIf} from "@angular/common";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Select} from "@app/NeoUI/select/select";
import {SelectDropdown} from "@app/NeoUI/select/select-dropdown";
import {SelectField} from "@app/NeoUI/select/select-field";
import {SelectMenu} from "@app/NeoUI/select/select-menu";
import {SelectMenuItem} from "@app/NeoUI/select/select-menu-item";
import {allContactLabels, getAddressLabel, getContactLabel} from "@app/conctact";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'CustomerFormMail, [CustomerFormMail]',
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
        <lucide-angular [img]="icons.MailIcon" class="my-icon"></lucide-angular>
        <div class="fontSize-18 fontWeight-semiBold">Adresses électroniques</div>
      </div>
      <div style="margin-left: 40px">
        <div *ngFor="let mail of formGroup.emails; let i=index"
             class="w-100 d-flex align-items-center" [class.mt-2]="i != 0" style="gap: 16px">
          <MySelect style="width: 160px">
            <SelectField #contactKindField style="width: 100%"
                         [value]="getContactLabel(mail.controls.kind.value)"
                         (onChange)="mail.controls.kind.setValue($event.code)">
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
            <label [for]="'mail-input-'+ mail.controls.id" TextFieldLabel>Adresse e-mail</label>
            <input type="email" TextFieldInput [id]="'mail-input-'+ mail.controls.id"
                   [formControl]="mail.controls.value"
            >
          </TextField>

          <button MyIconButton mat-ripple (click)="formGroup.removeEmail(mail)">
            <lucide-angular [img]="icons.XIcon" class="my-icon "></lucide-angular>
          </button>
        </div>

        <div class="mt-3 w-100 align-end">
          <button MyButton class="alpha-primary" mat-ripple (click)="formGroup.addEmail()">

            <lucide-angular [img]="icons.PlusIcon" class="my-icon "></lucide-angular>
            Ajouter une addresse e-mail
          </button>
        </div>
      </div>
    </div>
  `
})
export class CustomerFormMail {
  icons = { MailIcon, PlusIcon, XIcon };
  id = 0

  contactKinds = allContactLabels

  constructor(public form: CustomerForm) {
  }

  get model(): CustomerInfoModel {
    return this.form.model
  }

  // addEmail() {
  //   let mail = new Email();
  //   mail.id = ++this.id;
  //   console.log("id: ", this.id)
  //   this.model.emails.push(mail)
  // }

  removeEmail(id: number) {
    this.model.emails = this.model.emails.filter(m => m.id != id)
  }

  get formGroup(): CustomerFormGroup {
    return this.form.formGroup
  }

  protected readonly getContactLabel = getContactLabel;
}
