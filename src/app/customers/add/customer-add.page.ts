import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "@app/services";
import {LANGUAGES} from "@app/models/langs";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button} from "@app/ui";
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

const SAVE_FORM_KEY = "CUSTOMER_ADD_FORM";
@Component({
  standalone: true,
  imports: [
    CustomerForm,
    Button
  ],
  templateUrl: 'customer-add.page.html'
})
export class CustomerAddPage {
  constructor(private customerService: CustomerService,
              private snackbar: MatSnackBar,
              private _elementRef: ElementRef<HTMLElement>
              ) {

    let storedModel = localStorage.getItem(SAVE_FORM_KEY)
    let model: CustomerInfoModel

    if(storedModel) {
      model = new CustomerInfoModel(JSON.parse(storedModel))
    }else {
      model = new CustomerInfoModel()
      model = new CustomerInfoModel()
      model.emails = [new Email()]
      model.phones = [new Phone()]
      model.langs = [new Lang()]
      model.occupations = [new Occupation()]
      model.passports = [new Passport()]
      model.addresses = [new Address()]
      model.jobs = [new JobInfo()]
      model.studies = [new Study()]
      model.family = new FamilyInfo()
    }


    this.formGroup = new CustomerFormGroup(model, SAVE_FORM_KEY);
  }

  languages = LANGUAGES
  model: CustomerInfoModel
  formGroup: CustomerFormGroup

  // async add() {
  //   const customer = await this.customerService.addAsync(this.model);
  //   this.snackbar.open(`Le client ${customer.firstName} ${customer.lastName} a été ajouté.`, '', {duration: 5000});
  // }

  add() {
    console.log(this.formGroup.getModel())
  }

  @HostListener('keyup', ['$event'])
  onKeydown(event: KeyboardEvent) {
    //console.log('Key: ', event.code)
  }

  @HostListener('click')
  onClick() {
    console.log('Save customer add form')
    this.formGroup.save()
  }

  // ngOnInit() {
  //   this._elementRef.nativeElement.add
  // }
}
