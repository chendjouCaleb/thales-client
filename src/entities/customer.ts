import {BaseEntity} from "./base-entity";

export class Customer extends BaseEntity<number> {
  firstName: string = "";
  lastName: string = "";
  fullName: string = '';
  birthDate: Date;
  sex: string = '';

  languages: string[] = [];

  jobTitle: string = ""

  hasPassport: boolean;

  studyLevel: string = "";
  studyEndYear: number ;

  country: string = ""
  region: string = ""
  city: string = ""
  district: string = ""
  address: string = ""

  phoneNumber: string = ""
  email: string = ""

}
