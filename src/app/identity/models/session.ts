import {User} from "./user";
import {DateTime} from "luxon";

export class Session {
  constructor(value: any = null) {
    if (value) {
      this.id = value.id;
      this.userId = value.userId;
      this.user = new User(value.user);

      this.createdAt = DateTime.fromJSDate(value.createdAt);
      this.closedAt = DateTime.fromJSDate(value.closedAt);
    }
  }

  id: string = '';
  createdAt: DateTime;
  closedAt: DateTime;

  get isClosed(): boolean {
    return !!this.closedAt;
  }

  user: User;
  userId: string = ''
}
