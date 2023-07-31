import {Component, ViewChild} from "@angular/core";
import {CustomerAddPage} from "../customer-add.page";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  templateUrl: 'customer-add-job.html',
  selector: 'customer-add-job'
})
export class CustomerAddJob {
  formGroup = new FormGroup({
    jobTitle: new FormControl('')
  })

  constructor(public parent: CustomerAddPage) {}

  next() {
    const model = this.parent.model;
    model.jobTitle = this.formGroup.value.jobTitle;

    this.parent.stepper.next();
  }
}
