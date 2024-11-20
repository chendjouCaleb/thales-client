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

export class CustomerFormGroup {
  personInfo: FormGroup;
  private uniqueId = 0
  firstName = new FormControl(this.defaultModel.firstName);
  lastName = new FormControl(this.defaultModel.lastName);
  birthDate = new FormControl(this.defaultModel.birthDate);
  birthPlace = new FormControl(this.defaultModel.birthPlace);
  sex = new FormControl(this.defaultModel.sex);
  nationality = new FormControl(this.defaultModel.nationality);
  note = new FormControl(this.defaultModel.note);

  family = new FormGroup({
    maritalStatus: new FormControl(this.defaultModel.family?.maritalStatus),
    childrenCount: new FormControl(this.defaultModel.family?.childrenCount),
    marriedAt: new FormControl(this.defaultModel.family?.marriedAt),
  })

  emails = this.defaultModel.emails.map(email => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    kind: new FormControl(email.kind),
    value: new FormControl(email.value),
  }));

  phones = this.defaultModel.phones.map(phone => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    kind: new FormControl(phone.kind),
    value: new FormControl(phone.value),
  }));

  langs = this.defaultModel.langs.map(lang => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    name: new FormControl(lang.name),
    level: new FormControl(lang.level),
  }));

  passports = this.defaultModel.passports.map(passport => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    country: new FormControl(passport.country),
    expireAt: new FormControl(passport.expireAt),
    issuedAt: new FormControl(passport.issuedAt),
  }));

  occupations = this.defaultModel.occupations.map(occupation => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    name: new FormControl(occupation.name),
    level: new FormControl(occupation.level),
  }));

  studies = this.defaultModel.studies.map(study => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    schoolName: new FormControl(study.schoolName),
    level: new FormControl(study.level),
    discipline: new FormControl(study.discipline),
    startAt: new FormControl(study.startAt),
    endAt: new FormControl(study.endAt),
  }));

  jobs = this.defaultModel.jobs.map(job => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    enterpriseName: new FormControl(job.enterpriseName),
    jobTitle: new FormControl(job.jobTitle),
    address: new FormControl(job.address),
    serviceName: new FormControl(job.serviceName),
    startAt: new FormControl(job.startAt),
    endAt: new FormControl(job.endAt),
  }));

  addresses = this.defaultModel.addresses.map(address => new FormGroup({
    id: new FormControl((++this.uniqueId).toString()),
    country: new FormControl(address.country),
    region: new FormControl(address.region),
    city: new FormControl(address.city),
    street: new FormControl(address.street),
    postalCode: new FormControl(address.postalCode),
    kind: new FormControl(address.kind),
  }));


  constructor(private defaultModel: CustomerInfoModel, public readonly key = "CUSTOMER_ADD_FORM") {

  }

  getModel(): CustomerInfoModel {
    let model = new CustomerInfoModel()
    model.firstName = this.firstName.value;
    model.lastName = this.lastName.value;
    model.birthDate = this.birthDate.value;
    model.birthPlace = this.birthPlace.value;
    model.sex = this.sex.value;
    model.nationality = this.nationality.value;
    model.note = this.note.value;


    let family = new FamilyInfo()
    family.childrenCount = this.family.controls.childrenCount.value;
    family.maritalStatus = this.family.controls.maritalStatus.value;
    family.marriedAt = this.family.controls.marriedAt.value;

    model.family = family;

    model.emails = this.emails.map(mailControl => {
      let mail = new Email()
      mail.kind = mailControl.controls.kind.value;
      mail.value = mailControl.controls.value.value;
      return mail;
    });

    model.phones = this.phones.map(phoneControl => {
      let phone = new Phone()
      phone.kind = phoneControl.controls.kind.value;
      phone.value = phoneControl.controls.value.value;
      return phone;
    });

    model.langs = this.langs.map(langControl => {
      let lang = new Lang()
      lang.level = langControl.controls.level.value;
      lang.name = langControl.controls.name.value;
      return lang;
    });

    model.occupations = this.occupations.map(langControl => {
      let lang = new Occupation()
      lang.level = langControl.controls.level.value;
      lang.name = langControl.controls.name.value;
      return lang;
    });

    model.addresses = this.addresses.map(langControl => {
      let address = new Address()
      address.kind = langControl.controls.kind.value;
      address.country = langControl.controls.country.value;
      address.region = langControl.controls.region.value;
      address.city = langControl.controls.city.value;
      address.street = langControl.controls.street.value;
      address.postalCode = langControl.controls.postalCode.value;
      return address;
    });

    model.studies = this.studies.map(studyControl => {
      let study = new Study()
      study.schoolName = studyControl.controls.schoolName.value;
      study.discipline = studyControl.controls.discipline.value;
      study.level = studyControl.controls.level.value;
      study.startAt = studyControl.controls.startAt.value;
      study.endAt = studyControl.controls.endAt.value;
      return study;
    });

    model.jobs = this.jobs.map(studyControl => {
      let study = new JobInfo()
      study.enterpriseName = studyControl.controls.enterpriseName.value;
      study.jobTitle = studyControl.controls.jobTitle.value;
      study.serviceName = studyControl.controls.serviceName.value;
      study.address = studyControl.controls.address.value;
      study.startAt = studyControl.controls.startAt.value;
      study.endAt = studyControl.controls.endAt.value;
      return study;
    });

    model.passports = this.passports.map(studyControl => {
      let study = new Passport()
      study.country = studyControl.controls.country.value;
      study.expireAt = studyControl.controls.expireAt.value;
      study.issuedAt = studyControl.controls.issuedAt.value;
      return study;
    });

    return model;
  }

  addEmail(mail: Email = new Email()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      kind: new FormControl(mail.kind),
      value: new FormControl(mail.value),
    });
    this.emails = [...this.emails, formGroup];
    return formGroup;
  }

  removeEmail(formGroup: FormGroup) {
    this.emails = this.emails.filter(fg => fg !== formGroup)
  }


  addPhone(mail: Phone = new Phone()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      kind: new FormControl(mail.kind),
      value: new FormControl(mail.value),
    });
    this.phones = [...this.phones, formGroup];
    return formGroup;
  }

  removePhone(formGroup: FormGroup) {
    this.phones = this.phones.filter(fg => fg !== formGroup)
  }

  addLang(lang: Lang = new Lang()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      name: new FormControl(lang.name),
      level: new FormControl(lang.level),
    });
    this.langs = [...this.langs, formGroup];
    return formGroup;
  }

  removeLang(formGroup: FormGroup) {
    this.langs = this.langs.filter(fg => fg !== formGroup)
  }

  addAddress(mail: Address = new Address()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      kind: new FormControl(mail.kind),
      country: new FormControl(mail.country),
      region: new FormControl(mail.region),
      city: new FormControl(mail.city),
      street: new FormControl(mail.street),
      postalCode: new FormControl(mail.postalCode),
    });
    this.addresses = [...this.addresses, formGroup];
    return formGroup;
  }

  removeAddress(formGroup: FormGroup) {
    this.addresses = this.addresses.filter(fg => fg !== formGroup)
  }

  addStudy(study: Study = new Study()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      level: new FormControl(study.level),
      schoolName: new FormControl(study.schoolName),
      discipline: new FormControl(study.discipline),

      startAt: new FormControl(study.startAt),
      endAt: new FormControl(study.endAt),
    });
    this.studies = [...this.studies, formGroup];
    return formGroup;
  }

  removeStudy(formGroup: FormGroup) {
    this.studies = this.studies.filter(fg => fg !== formGroup)
  }

  addJob(jobInfo: JobInfo = new JobInfo()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      enterpriseName: new FormControl(jobInfo.enterpriseName),
      serviceName: new FormControl(jobInfo.serviceName),
      jobTitle: new FormControl(jobInfo.jobTitle),
      address: new FormControl(jobInfo.address),
      startAt: new FormControl(jobInfo.startAt),
      endAt: new FormControl(jobInfo.endAt),
    });
    this.jobs = [...this.jobs, formGroup];
    return formGroup;
  }

  removeJob(formGroup: FormGroup) {
    this.jobs = this.jobs.filter(fg => fg !== formGroup)
  }

  addPassport(passport: Passport = new Passport()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      country: new FormControl(passport.country),
      expireAt: new FormControl(passport.expireAt),
      issuedAt: new FormControl(passport.issuedAt),
    });
    this.passports = [...this.passports, formGroup];
    return formGroup;
  }

  removePassport(formGroup: FormGroup) {
    this.passports = this.passports.filter(fg => fg !== formGroup)
  }


  addOccupation(occupation: Occupation = new Occupation()): FormGroup {
    let formGroup = new FormGroup({
      id: new FormControl((++this.uniqueId).toString()),
      name: new FormControl(occupation.name),
      level: new FormControl(occupation.level),
    });
    this.occupations = [...this.occupations, formGroup];
    return formGroup;
  }

  removeOccupation(formGroup: FormGroup) {
    this.occupations = this.occupations.filter(fg => fg !== formGroup)
  }


  save() {
    let model = this.getModel();
    localStorage.setItem(this.key, JSON.stringify(model))
  }
}
