import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

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
    model.birthDate = this.formGroup.value.birthDate
    model.sex = this.formGroup.value.sex

    this.parent.stepper.next()
  }
}
