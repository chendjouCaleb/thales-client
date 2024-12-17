import {MemberJobInfo} from "@entities/member";

export class MemberAddModel {
  userId: string = '';
  isAdmin: boolean;

  jobInfo = new MemberJobInfo()
}
