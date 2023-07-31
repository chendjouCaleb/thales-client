export class CustomerAddFormModel {
  firstName: string = ""
  lastName: string = ""
  birthDate: string;
  sex: string = '';
  languages: string[] = [];

  jobTitle: string = '';

  hasPassport: boolean;

  studyEndYear: number;
  studyLevel: string = ''

  country: string = ''
  region: string = ''
  city: string = ''
  district: string = ''
  address: string = ''

  phoneNumber: string = '';
  email: string = '';
}


export class CustomerChangeInfoFormModel {
  firstName: string = ""
  lastName: string = ""
  birthDate: string;
  sex: string = '';
}

export class CustomerChangeJobFormModel {
  jobTitle: string = '';
}

export class CustomerChangeCultureFormModel {
  languages: string[] = [];
}

export class CustomerChangePassportFormModel {
  hasPassport: boolean
}

export class CustomerChangeStudyFormModel {
  studyEndYear: number;
  studyLevel: string = ''
}

export class CustomerChangeAddressFormModel {
  country: string = ''
  region: string = ''
  city: string = ''
  district: string = ''
  address: string = ''
}

export class CustomerChangeContactFormModel {
  phoneNumber: string = '';
  email: string = '';
}
