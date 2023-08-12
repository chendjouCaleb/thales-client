import {DateTime} from "luxon";

export class Actor {
  id: string;
  name: string;
  createdAt: DateTime;

  constructor(value: any = {}) {
    if(value) {
      this.id = value.id;
      this.name = value.name;
      this.createdAt = DateTime.fromISO(value.createdAt);
    }
  }
}
