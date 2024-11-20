import {Component, Input} from "@angular/core";
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {CustomerFormPerson} from "@app/customers/add/form/customer-form-person";
import {CustomerFormMail} from "@app/customers/add/form/customer-form-email";
import {CustomerInfoModel} from "@entities/customer";
import {CustomerFormPhone} from "@app/customers/add/form/customer-form-phone";
import {CustomerFormLang} from "@app/customers/add/form/customer-form-language";
import {CustomerFormOccupation} from "@app/customers/add/form/customer-form-occupation";
import {CustomerFormPassport} from "@app/customers/add/form/customer-form-passport";
import {CustomerFormFamily} from "@app/customers/add/form/customer-form-family";
import {CustomerFormAddress} from "@app/customers/add/form/customer-form-address";
import {CustomerFormJob} from "@app/customers/add/form/customer-form-job";
import {CustomerFormStudy} from "@app/customers/add/form/customer-form-study";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";

@Component({
  templateUrl: 'customer.form.html',
  styleUrl: 'customer.form.scss',
  standalone: true,
  imports: [
    TextField,
    TextFieldInput,
    TextFieldLabel,
    CustomerFormPerson,
    CustomerFormMail,
    CustomerFormPhone,
    CustomerFormLang,
    CustomerFormOccupation,
    CustomerFormPassport,
    CustomerFormFamily,
    CustomerFormAddress,
    CustomerFormJob,
    CustomerFormStudy
  ],
  selector: 'CustomerForm'
})
export class CustomerForm {

  @Input()
  formGroup: CustomerFormGroup
}
