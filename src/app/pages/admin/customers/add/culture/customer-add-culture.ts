import {Component} from "@angular/core";
import {LANGUAGES} from "../../../../../models/langs";
import {CustomerAddFormModel} from "../../../../../models";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup, Validator} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-culture.html',
  selector: 'customer-add-culture'
})
export class CustomerAddCulture {
  languages = LANGUAGES;
  model = new CustomerAddFormModel();

  formGroup = new FormGroup({
    languages: new FormControl([], )
  })

  constructor(public parent: CustomerAddPage) {}


  next() {
    const model = this.parent.model;
    model.languages = this.formGroup.value.languages

    this.parent.stepper.next();
  }
}
