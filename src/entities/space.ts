import {BaseEntity} from "./base-entity";
import {formatPhoneNumber} from "@app/utils";

export class Space extends BaseEntity<number> {
  name: string = '';

  description: string = '';
  identifier: string = '';
  normalizedIdentifier: string = '';

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.description = value.description;
      this.name = value.name;
      this.identifier = value.identifier;
      this.normalizedIdentifier = value.normalizedIdentifier;
    }
  }
}

