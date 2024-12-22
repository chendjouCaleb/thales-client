import {BaseEntity} from "./base-entity";
import {formatPhoneNumber} from "@app/utils";
import {Space} from "@entities/space";

export class Agency extends BaseEntity<number> {
  name: string = '';
  normalizedName: string = '';
  ownerId: string

  space: Space;
  spaceId: number;

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

      this.ownerId = value.ownerId;
      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;
    }
  }

  get formattedPhoneNumber1(): string {
    return formatPhoneNumber(this.phoneNumber1);
  }

  get formattedPhoneNumber2(): string {
    return formatPhoneNumber(this.phoneNumber2);
  }
}

