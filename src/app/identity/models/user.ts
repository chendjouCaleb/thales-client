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

      this.createdAt = DateTime.fromISO(value.createdAt)
    }
  }

  id: string = '';
  createdAt: DateTime
  fullName: string = '';

  userName: string = '';
  normalizedName: string = '';

  email: string = '';
  normalizedEmail: string = '';
}
