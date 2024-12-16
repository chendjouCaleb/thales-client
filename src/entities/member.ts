import {BaseEntity} from "./base-entity";
import {User} from "@app/identity";
import {Space} from "@entities/space";

export class Member extends BaseEntity<number> {
  isAdmin: boolean
  isLocked: boolean

  space:Space;
  spaceId: number;

  user: User
  userId: string = '';

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.isAdmin = value.isAdmin;
      this.isLocked = value.isLocked;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;
    }
  }

}

