import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-passport.html',
  selector: 'customer-add-passport'
})
export class CustomerAddPassport {

  formGroup = new FormGroup({
    hasPassport: new FormControl('')
  })

  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.hasPassport = this.formGroup.value.hasPassport == 'y';

    this.parent.stepper.next();
  }
}
