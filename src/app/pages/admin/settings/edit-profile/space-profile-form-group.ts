import {FormControl, FormGroup} from "@angular/forms";
import {
  Address,
  CustomerInfoModel,
  Email,
  FamilyInfo,
  JobInfo,
  Lang,
  Occupation,
  Passport,
  Phone,
  Study
} from "@entities/customer";
import {DateTime} from "luxon";
import {SpaceProfileModel} from "@app/models";
import {Space} from "@entities/space";

export class SpaceProfileFormGroup {
  uniqueId = 1;
  name = new FormControl(this.defaultModel.name);
  nationalId = new FormControl(this.defaultModel.nationalId);
  description = new FormControl(this.defaultModel.description);

  emails = this.defaultModel.emails.map(email => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    value: new FormControl(email.value),
  }));

  phones = this.defaultModel.phones.map(phone => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    value: new FormControl(phone.value),
  }));



  address =  new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    country: new FormControl(this.defaultModel.address.country),
    region: new FormControl(this.defaultModel.address.region),
    city: new FormControl(this.defaultModel.address.city),
    street: new FormControl(this.defaultModel.address.street),
    postalCode: new FormControl(this.defaultModel.address.postalCode)
  });


  constructor(private defaultModel: Space) {

  }

  getModel(): SpaceProfileModel {
    let model = new SpaceProfileModel()
    model.name = this.name.value;
    model.description = this.description.value;
    model.nationalId = this.nationalId.value;


    model.emails = this.emails.map(mailControl => {
      let mail = new Email()
      mail.kind = "";
      mail.value = mailControl.controls.value.value;
      return mail;
    });

    model.phones = this.phones.map(phoneControl => {
      let phone = new Phone()
      phone.kind = "";
      phone.value = phoneControl.controls.value.value;
      return phone;
    });

    let address = new Address()
    address.country     = this.address.controls.country.value;
    address.region      = this.address.controls.region.value;
    address.city        = this.address.controls.city.value;
    address.street      = this.address.controls.street.value;
    address.postalCode  = this.address.controls.postalCode.value;


    model.address = address;

    return model;
  }

  addEmail(mail: Email = new Email()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
            value: new FormControl(mail.value),
    });
    this.emails = [ ...this.emails, formGroup ];
    return formGroup;
  }

  removeEmail(formGroup: FormGroup) {
    this.emails = this.emails.filter(fg => fg !== formGroup)
  }


  addPhone(mail: Phone = new Phone()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      value: new FormControl(mail.value),
    });
    this.phones = [ ...this.phones, formGroup ];
    return formGroup;
  }

  removePhone(formGroup: FormGroup) {
    this.phones = this.phones.filter(fg => fg !== formGroup)
  }

}
