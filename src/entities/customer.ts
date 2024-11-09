import {BaseEntity} from "./base-entity";
import {DateTime} from "luxon";
import {formatPhoneNumber} from "@app/utils";

export class Customer extends BaseEntity<number> {
  firstName: string = "";
  lastName: string = "";
  fullName: string = '';
  birthDate: DateTime;
  birthPlace: string = ''
  sex: string = '';
  nationality: string = ''
  note: string = ''

  languages: string[] = [];

  jobTitle: string = ""

  hasPassport: boolean;

  studyLevel: string = "";
  studyEndYear: number;

  country: string = "";
  region: string = "";
  city: string = "";
  district: string = "";
  address: string = "";

  phoneNumber: string = "";
  email: string = "";

  family: FamilyInfo
  occupations: Occupation[] = []
  jobs: JobInfo[] = []
  addresses: Address[] = []
  emails: Email[] = []
  phones: Phone[] = []
  passports: Passport[] = []
  studies: Study[] = []

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.firstName = value.firstName;
      this.lastName = value.lastName;
      this.fullName = value.fullName;
      this.birthDate = DateTime.fromISO(value.birthDate);
      this.sex = value.sex;
      this.languages = value.languages;
      this.jobTitle = value.jobTitle;
      this.hasPassport = value.hasPassport
      this.studyLevel = value.studyLevel;
      this.studyEndYear = value.studyEndYear
      this.country = value.country;
      this.region = value.region;
      this.city = value.city;
      this.district = value.district;
      this.address = value.address;
      this.phoneNumber = value.phoneNumber;
      this.email = value.email;
      this.family = new FamilyInfo(value.family);
      this.occupations = value.occupations.map(o => new Occupation(o));
      this.jobs = value.jobs.map(j => new JobInfo(j));
      this.addresses = value.addresses.map(a => new Address(a));
      this.emails = value.emails.map(e => new Email(e));
      this.phones = value.phones.map(p => new Phone(p));
      this.passports = value.passports.map(p => new Passport(p));
      this.studies = value.studies.map(s => new Study(s));
      this.note = value.note
      this.nationality = value.nationality
    }
  }

  get formattedPhoneNumber(): string {
    return formatPhoneNumber(this.phoneNumber)
  }
}


export class JobInfo {
  constructor(value: any = {}) {
    if (value) {
      this.enterpriseName = value.enterpriseName;
      this.jobTitle = value.jobTitle;
      this.serviceName = value.serviceName;
      this.address = value.address;
      this.startAt = value.startAt;
      this.endAt = value.endAt;

    }
  }
  enterpriseName: string = ''
  jobTitle: string = ''
  serviceName: string = ''
  address: string = ''
  startAt: Date
  endAt: Date
}

export class Occupation {
  constructor(value: any = {}) {
    if (value) {
      this.name = value.name;
      this.level = value.level;
    }
  }

  name: string = ''
  level: string = ''
}

export class FamilyInfo {
  constructor(value: any = {}) {
    if (value) {
      this.married = value.married;
      this.marriedAt = value.marriedAt;
      this.childrenCount = value.childrenCount;
    }
  }

  married: boolean
  marriedAt: Date
  childrenCount: number
}

export class Address {
  constructor(value: any = {}) {
    if (value) {
      this.kind = value.kind;
      this.country = value.country;
      this.region = value.region;
      this.postalCode = value.postalCode;
      this.city = value.city;
      this.street = value.street;

    }
  }

  kind: string = ''
  country: string = ''
  region: string = ''
  postalCode: string = ''
  city: string = ''
  street: string = ''
}

export class Email {
  constructor(value: any = {}) {
    if (value) {
      this.value = value.value;
      this.kind = value.kind;
    }
  }

  kind: string = ''
  value: string = ''
}

export class Phone {
  constructor(value: any = {}) {
    if (value) {
      this.value = value.value;
      this.kind = value.kind;
    }
  }

  kind: string = ''
  value: string = ''
}

export class Lang {
  constructor(value: any = {}) {
    if (value) {
      this.name = value.name;
      this.level = value.level;
    }
  }

  name: string
  level: string
}

export class Passport {
  constructor(value: any = {}) {
    if (value) {
      this.country = value.country;
      this.issuedAt = value.issuedAt;
      this.expireAt = value.expireAt;

    }
  }

  country: string = ''
  issuedAt: string = ''
  expireAt: Date
}

export class Study {
  constructor(value: any = {}) {
    if (value) {
      this.schoolName = value.schoolName;
      this.discipline = value.discipline;
      this.level = value.level;
      this.startAt = value.startAt;
      this.endAt = value.endAt;

    }
  }
  schoolName: string
  discipline: string
  level: string
  startAt: Date
  endAt: Date
}
