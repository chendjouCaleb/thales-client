import {BaseEntity} from "./base-entity";
import {formatPhoneNumber} from "@app/utils";

export class Agency extends BaseEntity<number> {
  name: string = '';
  normalizedName: string = '';

  address: string = '';
  postalCode: string = '';
  phoneNumber1: string = '';
  phoneNumber2: string = '';

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.normalizedName = value.normalizedName;
      this.name = value.name;
      this.address = value.address;
      this.postalCode = value.postalCode;
      this.phoneNumber1 = value.phoneNumber1;
      this.phoneNumber2 = value.phoneNumber2;
    }
  }

  get formattedPhoneNumber1(): string {
    return formatPhoneNumber(this.phoneNumber1);
  }

  get formattedPhoneNumber2(): string {
    return formatPhoneNumber(this.phoneNumber2);
  }
}

