import {FormControl, FormGroup} from "@angular/forms";
import {Customer} from "@entities/customer";

export function customerInfoForm(value: Customer)  {
  return new FormGroup({
    firstName: new FormControl(value.firstName),
    lastName: new FormControl(value.lastName),
    birthDate: new FormControl<Date>(value.birthDate.toJSDate()),
    sex: new FormControl(value.sex)
  });
}
