export class MemberAddModel {
  userId: string = '';
  isAdmin: boolean;

  jobInfo = new MemberJobInfo()
}

export class MemberJobInfo {
  jobTitle: string = ''
  serviceName: string = ''
  jobDescription: string = ''
}
