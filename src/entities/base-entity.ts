import {DateTime} from "luxon";

export class BaseEntity<TID> {
  id: TID;
  createdAt: DateTime;
  deletedAt: DateTime;


  constructor(value: any = {}) {
    if(value){
      this.createdAt = DateTime.fromISO(value.createdAt);
      this.deletedAt = DateTime.fromISO(value.deletedAt);
      this.id = value.id;
    }
  }

  get deleted(): Boolean {
    return this.deletedAt != null;
  }
}
