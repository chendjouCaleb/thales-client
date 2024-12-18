export interface UserAddModel {
  fullName: string;
  email: string;
}

export class SignInModel {
  fullName: string;
  email: string;
  code: string;
  password: string
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


export interface CheckVerificationModel {
  code: string;
  userId: string;
}

export interface CheckPasswordModel {
  password: string;
  userId: string;
}
