import {BaseEntity} from "./base-entity";
import {DateTime} from "luxon";
import {formatPhoneNumber} from "@app/utils";

export class Customer extends BaseEntity<number> {
  firstName: string = "";
  lastName: string = "";
  fullName: string = '';
  birthDate: DateTime;
  sex: string = '';

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
    }
  }

  get formattedPhoneNumber(): string {
    return formatPhoneNumber(this.phoneNumber)
  }
}
