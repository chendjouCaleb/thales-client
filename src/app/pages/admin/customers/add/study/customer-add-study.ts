import {Component} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-study.html',
  selector: 'customer-add-study'
})
export class CustomerAddStudy {

  formGroup = new FormGroup({
    studyEndYear: new FormControl<number>(null),
    studyLevel: new FormControl('')
  });

  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.studyLevel = this.formGroup.controls.studyLevel.value;
    model.studyEndYear = this.formGroup.controls.studyEndYear.value;

    this.parent.stepper.next();
  }
}
