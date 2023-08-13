import {DateTime} from "luxon";

export class User {
  constructor(value: any = null) {
    if (value) {
      this.id = value.id;
      this.fullName = value.fullName;
      this.userName = value.userName;
      this.normalizedName = value.normalizedName;
      this.email = value.email;
      this.normalizedEmail = value.normalizedEmail;

      this.createdAt = DateTime.fromISO(value.createdAt);

      this.actorId = value.actorId;
      this.publisherId = value.publisherId;
      this.subjectId = value.subjectId;
    }
  }

  id: string = '';
  createdAt: DateTime;
  fullName: string = '';

  userName: string = '';
  normalizedName: string = '';

  email: string = '';
  normalizedEmail: string = '';

  actorId: string = '';
  publisherId: string = '';
  subjectId: string = '';
}
