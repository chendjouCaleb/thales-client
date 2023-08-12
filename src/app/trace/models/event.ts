import {DateTime} from "luxon";

export class Event {
  id: number;
  createdAt: DateTime;
  name: string = '';
  dataValue: string = '';
  subjectId: string;
  publisherId: string;

  constructor(value: any = {}) {
    if(value) {
      this.id = value.id;
      this.name = value.name;
      this.createdAt = DateTime.fromISO(value.createdAt);
      this.dataValue = value.dataValue;
      this.subjectId = value.subjectId;
      this.publisherId = value.publisherId;
    }
  }
}
