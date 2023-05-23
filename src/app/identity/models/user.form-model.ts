export interface UserAddModel {
  fullName: string;
  email: string;
}


export class ChangeInfoModel {
  fullName: string = '';
}

export class UserChangePasswordModel {
  currentPassword: string = '';
  newPassword: string = '';
}

