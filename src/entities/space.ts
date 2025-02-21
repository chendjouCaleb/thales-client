import {BaseEntity} from "./base-entity";
import {Address, Email, Phone} from "@entities/customer";

export class Space extends BaseEntity<number> {
  name: string = '';

  description: string = '';
  identifier: string = '';
  normalizedIdentifier: string = '';

  nationalId: string = '';
  emails: Email[] = []
  phones: Phone[] = []
  address: Address

  ownerId: string;

  info: Info

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.description = value.description;
      this.name = value.name;
      this.identifier = value.identifier;
      this.normalizedIdentifier = value.normalizedIdentifier;
      this.ownerId = value.ownerId;
      this.nationalId = value.nationalId;
      this.info = value.info;
      this.phones = value.phones ? value.phones.map(p => new Phone(p)) : [];
      this.emails = value.emails ? value.emails.map(p => new Email(p)) : [];
      this.address = new Address(value.address)

    }
  }
}

export class Info {
  nationalId: string
}
