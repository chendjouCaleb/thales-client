import {BaseEntity} from "./base-entity";
import {DateTime} from "luxon";
import {formatPhoneNumber} from "@app/utils";
import {getCountry} from "../countries";

export class Customer extends BaseEntity<number> {

  isArchived: boolean = false;
  isFavorite: boolean = false;

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
  emails: Email[] = []
  phones: Phone[] = []
  passports: Passport[] = []
  studies: Study[] = []
  jobs: JobInfo[] = []
  addresses: Address[] = []
  langs: Lang[] = []

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.isArchived = value.isArchived;
      this.isFavorite = value.isFavorite;
      this.firstName = value.firstName;
      this.lastName = value.lastName;
      this.fullName = value.fullName;
      this.nationality = value.nationality;
      this.birthDate = DateTime.fromISO(value.birthDate);
      this.birthPlace = value.birthPlace;
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
      if(value.occupations) {
        this.occupations = value.occupations.map(o => new Occupation(o));
      }

      if(value.jobs) {
        this.jobs = value.jobs.map(j => new JobInfo(j));
      }

      if(value.addresses) {
        this.addresses = value.addresses.map(a => new Address(a));
      }

      if(value.emails) {
        this.emails = value.emails.map(e => new Email(e));
      }

      if(value.phones) {
        this.phones = value.phones.map(p => new Phone(p));
      }

      if(value.passports) {
        this.passports = value.passports.map(p => new Passport(p));
      }


      this.studies = value.studies ? value.studies.map(s => new Study(s)) : [];
      this.langs = value.langs ? value.langs.map(s => new Lang(s)) : [];
      this.note = value.note
      this.nationality = value.nationality
    }
  }

  get formattedPhoneNumber(): string {
    return formatPhoneNumber(this.phoneNumber)
  }
}


export class CustomerInfoModel {
  isFavorite: boolean = false;

  firstName: string = '';
  lastName: string = '';
  birthDate: Date;
  birthPlace: string = ''
  sex: string = '';
  nationality: string = ''
  note: string = '';

  family: FamilyInfo
  occupations: Occupation[] = []
  jobs: JobInfo[] = []
  addresses: Address[] = []
  emails: Email[] = []
  phones: Phone[] = []
  passports: Passport[] = []
  studies: Study[] = []
  langs: Lang[] = []

  constructor(value: any | null = null) {
    if (value) {
      this.isFavorite = value.isFavorite;
      this.firstName = value.firstName;
      this.lastName = value.lastName;
      this.nationality = value.nationality;
      this.birthDate = value.birthDate ? new Date(value.birthDate) : null;
      this.birthPlace = value.birthPlace;
      this.sex = value.sex;
      this.family = new FamilyInfo(value.family);
      if(value.occupations) {
        this.occupations = value.occupations.map(o => new Occupation(o));
      }

      if(value.jobs) {
        this.jobs = value.jobs.map(j => new JobInfo(j));
      }

      if(value.addresses) {
        this.addresses = value.addresses.map(a => new Address(a));
      }

      if(value.emails) {
        this.emails = value.emails.map(e => new Email(e));
      }

      if(value.phones) {
        this.phones = value.phones.map(p => new Phone(p));
      }

      if(value.passports) {
        this.passports = value.passports.map(p => new Passport(p));
      }


      this.studies = value.studies ? value.studies.map(s => new Study(s)) : [];
      this.langs = value.langs ? value.langs.map(s => new Lang(s)) : [];
      this.note = value.note
      this.nationality = value.nationality
    }
  }


  clean() {
    this.emails = this.emails.filter(e => e.value !== '');
    this.phones = this.phones.filter(e => e.value !== '');
    this.langs = this.langs.filter(e => e.name !== '');

    this.passports = this.passports.filter(p => p.country !== '');
  }
}


export class JobInfo {
  constructor(value: any = null) {
    if (value) {
      this.enterpriseName = value.enterpriseName;
      this.jobTitle = value.jobTitle;
      this.serviceName = value.serviceName;
      this.address = value.address;
      this.startAt =  value.startAt ?new Date(value.startAt) : null;
      this.endAt =    value.endAt ?new Date(value.endAt) : null;

    }
  }
  id: number = 0;
  enterpriseName: string = ''
  jobTitle: string = ''
  serviceName: string = ''
  address: string = ''
  startAt: Date
  endAt: Date
}

export class Occupation {
  constructor(value: any = null) {
    if (value) {

      this.name = value.name;
      this.level = value.level;
    }
  }

  id: number = 0;
  name: string = ''
  level: string = ''
}

export class FamilyInfo {
  constructor(value: any = null) {
    if (value) {
      this.married = value.married;
      this.marriedAt = value.marriedAt ? new Date(value.marriedAt) : null;
      this.childrenCount = value.childrenCount;
      this.maritalStatus = value.maritalStatus;
    }
  }

  maritalStatus: string = ''
  married: boolean
  marriedAt: Date
  childrenCount: number
}

export class Address {
  constructor(value: any = null) {
    if (value) {
      this.kind = value.kind;
      this.country = value.country;
      this.region = value.region;
      this.postalCode = value.postalCode;
      this.city = value.city;
      this.street = value.street;

    }
  }

  id: number = 0;
  kind: string = ''
  country: string = ''
  region: string = ''
  postalCode: string = ''
  city: string = ''
  street: string = ''

  toString(): string {
    return `${this.postalCode} ${this.street}, ${this.city}-${getCountry(this.country).name}`
  }
}

export class Email {
  constructor(value: any = null) {
    if (value) {
      this.value = value.value;
      this.kind = value.kind;
    }
  }

  id: number = 0;
  kind: string = ''
  value: string = ''
}

export class Phone {
  constructor(value: any = null) {
    if (value) {
      this.value = value.value;
      this.kind = value.kind;
    }
  }

  id: number = 0;
  kind: string = ''
  value: string = ''

  get formatted(): string {
    return formatPhoneNumber(this.value)
  }
}

export class Lang {
  constructor(value: any = null) {
    if (value) {
      this.name = value.name;
      this.level = value.level;
    }
  }

  id: number = 0;
  name: string = ''
  level: string = ''
}

export class Passport {
  constructor(value: any = null) {
    if (value) {
      this.country = value.country;
      this.issuedAt = value.issuedAt ? new Date(value.issuedAt) : null;
      this.expireAt = value.expireAt ? new Date(value.expireAt) : null;
    }
  }

  id: number = 0;
  country: string = ''
  issuedAt: Date
  expireAt: Date
}

export class Study {
  constructor(value: any = null) {
    if (value) {
      this.schoolName = value.schoolName;
      this.discipline = value.discipline;
      this.level = value.level;
      this.startAt = value.startAt ? new Date(value.startAt): null;
      this.endAt =  value.endAt ?  new Date(value.endAt) : null;

    }
  }

  id: number = 0;
  schoolName: string = ''
  discipline: string = ''
  level: string = ''
  startAt: Date
  endAt: Date
}
