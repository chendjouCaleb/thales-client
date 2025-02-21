import {Address, Email, Phone} from "@entities/customer";

export class SpaceAddModel {
  name: string = '';
  description: string = '';
  identifier: string = '';
}

export class SpaceProfileModel {
  name: string
  description: string;
  nationalId: string;
  address: Address;
  phones: Phone[];
  emails: Email[];

  constructor(value: any = {}) {
    if (value) {
      this.description = value.description;
      this.name = value.name;
      this.nationalId = value.nationalId;
      this.phones = value.phones ? value.phones.map(p => new Phone(p)) : [];
      this.emails = value.emails ? value.emails.map(p => new Email(p)) : [];
      this.address = new Address(value.address)

    }
  }
}
