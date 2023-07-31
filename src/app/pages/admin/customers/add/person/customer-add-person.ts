import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";
import {DateTime} from "luxon";

@Component({
  templateUrl: 'customer-add-person.html',
  selector: 'customer-add-person'
})
export class CustomerAddPerson {
  formGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    birthDate: new FormControl<Date>(null),
    sex: new FormControl('')
  });

  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.firstName = this.formGroup.value.firstName
    model.lastName = this.formGroup.value.lastName
    model.birthDate = DateTime.fromJSDate(this.formGroup.value.birthDate).toFormat('yyyy-LL-dd')
    model.sex = this.formGroup.value.sex

    this.parent.stepper.next()
  }
}
