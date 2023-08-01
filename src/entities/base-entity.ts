import {DateTime} from "luxon";

export class BaseEntity<TID> {
  id: TID;
  createdAt: DateTime;
  deletedAt: DateTime;
  code: string = '';


  constructor(value: any = {}) {
    if(value){
      this.createdAt = DateTime.fromISO(value.createdAt);
      this.deletedAt = value.deletedAt ? DateTime.fromISO(value.deletedAt) : null;
      this.id = value.id;
      this.code = value.code;
    }
  }

  get deleted(): Boolean {
    return this.deletedAt != null;
  }
}
