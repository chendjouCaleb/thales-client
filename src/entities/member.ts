import {BaseEntity} from "./base-entity";
import {User} from "@app/identity";
import {Space} from "@entities/space";

export class Member extends BaseEntity<number> {
  isAdmin: boolean
  isLocked: boolean

  actorId: string

  space:Space;
  spaceId: number;

  user: User
  userId: string = '';

  jobInfo = new MemberJobInfo()

  constructor(value: any = {}) {
    super(value);
    if (value) {
      this.isAdmin = value.isAdmin;
      this.isLocked = value.isLocked;
      this.actorId = value.actorId;

      this.spaceId = value.spaceId;
      this.space = value.space ? new Space(value.space) : undefined;

      this.userId = value.userId;
      this.user = value.user ? new User(value.user) : undefined;

      this.jobInfo = new MemberJobInfo(value.jobInfo)
    }
  }

}

export class MemberJobInfo {
  jobTitle: string = '';
  serviceName: string = '';
  jobDescription: string = '';

  constructor(value: any = {}) {
    this.jobTitle = value.jobTitle;
    this.serviceName = value.serviceName;
    this.jobDescription = value.jobDescription;

  }
}
