import {DateTime} from "luxon";

export class BaseEntity<TID> {
  id: TID;
  createdAt: DateTime;
  deletedAt: DateTime;
  code: string = '';

  publisherId: string;
  subjectId: string;
  elementId: string

  constructor(value: any = {}) {
    if(value){
      this.createdAt = DateTime.fromISO(value.createdAt);
      this.deletedAt = value.deletedAt ? DateTime.fromISO(value.deletedAt) : null;
      this.id = value.id;
      this.code = value.code;
      this.publisherId = value.publisherId;
      this.subjectId = value.subjectId;
      this.elementId = value.elementId;
    }
  }

  get deleted(): Boolean {
    return this.deletedAt != null;
  }
}
