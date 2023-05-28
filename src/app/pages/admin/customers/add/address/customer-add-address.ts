import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-address.html',
  selector: 'customer-add-address'
})
export class CustomerAddAddress {
  formGroup = new FormGroup({
    country: new FormControl(''),
    region: new FormControl(''),
    city: new FormControl(''),
    district: new FormControl(''),
    address: new FormControl('')
  })


  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.country = this.formGroup.value.country
    model.region = this.formGroup.value.region
    model.city = this.formGroup.value.city
    model.district = this.formGroup.value.district
    model.address = this.formGroup.value.address


    this.parent.stepper.next()
  }
}
