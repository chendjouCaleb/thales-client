import {DateTime} from "luxon";

export class Subject {
  createdAt: DateTime;
  id: string;
  name: string;

  constructor(value: any = {}) {
    if(value) {
      this.id = value.id;
      this.name = value.name;
      this.createdAt = DateTime.fromISO(value.createdAt);
    }
  }

}
