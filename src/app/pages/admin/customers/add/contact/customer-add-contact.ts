import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-contact.html',
  selector: 'customer-add-contact'
})
export class CustomerAddContact {
  formGroup = new FormGroup({
    phoneNumber: new FormControl(''),
    email: new FormControl('')
  })
  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.phoneNumber = this.formGroup.value.phoneNumber;
    model.email = this.formGroup.value.email;

    this.parent.stepper.next();
  }
}
