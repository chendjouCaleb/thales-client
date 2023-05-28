import {FormControl, FormGroup} from "@angular/forms";

export function customerInfoForm(value: any)  {
  return new FormGroup({
    firstName: new FormControl(value.firstName),
    lastName: new FormControl(value.lastName),
    birthDate: new FormControl<Date>(value.birthDate),
    sex: new FormControl(value.sex)
  });
}
