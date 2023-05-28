import {Component, ViewChild} from "@angular/core";
import {LANGUAGES} from "../../../../models/langs";
import {MatStepper} from "@angular/material/stepper";
import {CustomerAddFormModel} from "../../../../models";
import {CustomerService} from "../../../../services";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  templateUrl: 'customer-add.page.html'
})
export class CustomerAddPage {
  constructor(private customerService: CustomerService, private snackbar: MatSnackBar) {}

  languages = LANGUAGES

  @ViewChild('stepper')
  stepper: MatStepper

  model = new CustomerAddFormModel();

  async add() {
    const customer = await this.customerService.addAsync(this.model);
    this.snackbar.open(`Le client ${customer.firstName} ${customer.lastName} a été ajouté.`);
  }
}
