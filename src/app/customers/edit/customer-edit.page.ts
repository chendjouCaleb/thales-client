import {Component, OnInit} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomerService} from "@app/services";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button, IconButton} from "@app/ui";
import {Customer, CustomerInfoModel} from "@entities/customer";
import {CustomerFormGroup} from "@app/customers/add/form/customer-form-group";

import {ArrowLeftIcon, EraserIcon, LucideAngularModule,} from 'lucide-angular';
import {ActivatedRoute} from "@angular/router";
import {Location, NgIf} from "@angular/common";

const CUSTOMER_FORM_EDIT_KEY = "CUSTOMER_EDIT_FORM";
@Component({
  standalone: true,
  imports: [
    CustomerForm,
    Button,
    LucideAngularModule,
    IconButton,
    NgIf
  ],
  templateUrl: 'customer-edit.page.html'
})
export class CustomerEditPage implements OnInit {
  icons = { EraserIcon, ArrowLeftIcon }
  formGroup: CustomerFormGroup

  customer: Customer


  constructor(private _customerService: CustomerService,
              private _route: ActivatedRoute,
              public location: Location,
              private snackbar: MatSnackBar) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['customerId'];
    this.customer = await this._customerService.getAsync(id);

    const model = new CustomerInfoModel(this.customer);
    this.formGroup = new CustomerFormGroup(model, CUSTOMER_FORM_EDIT_KEY);
  }


  async update() {
    let model = this.formGroup.getModel();
     await this._customerService.updateAsync(this.customer, model);
    this.snackbar.open(`Le client a été modifié.`, '', {duration: 5000});
  }


}
