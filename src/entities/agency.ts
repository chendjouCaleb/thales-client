import {BaseEntity} from "./base-entity";

export class Agency extends BaseEntity<number> {
  name: string = '';
  normalizedName: string = '';

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.normalizedName = value.normalizedName;
      this.name = value.name;
    }
  }
}

