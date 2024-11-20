import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "@app/services";
import {LANGUAGES} from "@app/models/langs";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button, IconButton} from "@app/ui";
import {
  Address,
  CustomerInfoModel,
  Email,
  FamilyInfo,
  JobInfo,
  Lang,
  Occupation,
  Passport,
  Phone, Study
} from "@entities/customer";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";

import {
  LucideAngularModule,
  EraserIcon
} from 'lucide-angular';

const SAVE_FORM_KEY = "CUSTOMER_ADD_FORM";
@Component({
  standalone: true,
  imports: [
    CustomerForm,
    Button,
    LucideAngularModule,
    IconButton
  ],
  templateUrl: 'customer-add.page.html'
})
export class CustomerAddPage {
  icons = {EraserIcon}
  formGroup: CustomerFormGroup


  constructor(private customerService: CustomerService,
              private snackbar: MatSnackBar) {

    let model: CustomerInfoModel
    let storedModel = localStorage.getItem(SAVE_FORM_KEY)

    if(storedModel) {
      model = new CustomerInfoModel(JSON.parse(storedModel))
    } else {
      model = this.defaultModel();
    }

    this.formGroup = new CustomerFormGroup(model, SAVE_FORM_KEY);
  }



  async add() {
    let model = this.formGroup.getModel();
    const customer = await this.customerService.addAsync(model);
    this.snackbar.open(`Le client ${customer.firstName} ${customer.lastName} a été ajouté.`, '', {duration: 5000});
  }


  @HostListener('keyup', ['$event'])
  onKeydown(event: KeyboardEvent) {
    console.log('Key: ', event.code)
  }

  @HostListener('click')
  onClick() {
    console.log('Save customer add form')
    this.formGroup.save()
  }

  clear() {
    localStorage.removeItem(SAVE_FORM_KEY);
    this.formGroup = new CustomerFormGroup(this.defaultModel(), SAVE_FORM_KEY);
  }

  defaultModel(): CustomerInfoModel {

    const model = new CustomerInfoModel()
    model.emails = [new Email()]
    model.phones = [new Phone()]
    model.langs = [new Lang()]
    model.occupations = [new Occupation()]
    model.passports = [new Passport()]
    model.addresses = [new Address()]
    model.jobs = [new JobInfo()]
    model.studies = [new Study()]
    model.family = new FamilyInfo();

    return model;
  }
}
