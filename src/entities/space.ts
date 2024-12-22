import {BaseEntity} from "./base-entity";

export class Space extends BaseEntity<number> {
  name: string = '';

  description: string = '';
  identifier: string = '';
  normalizedIdentifier: string = '';

  ownerId: string;

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.description = value.description;
      this.name = value.name;
      this.identifier = value.identifier;
      this.normalizedIdentifier = value.normalizedIdentifier;
      this.ownerId = value.ownerId;
    }
  }
}

