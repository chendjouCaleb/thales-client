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

export interface ResetPasswordModel {
  code: string;
  password: string;
  userId: string;
}


export interface CheckResetPasswordModel {
  code: string;
  userId: string;
}

export interface CheckPasswordModel {
  password: string;
  userId: string;
}
