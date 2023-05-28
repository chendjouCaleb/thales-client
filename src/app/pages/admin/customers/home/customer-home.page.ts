import {Component, OnInit} from "@angular/core";
import {Customer} from "../../../../../entities";
import {CustomerService} from "../../../../services";
import {ActivatedRoute, Route} from "@angular/router";
import {LANGUAGES} from "../../../../models/langs";
import {MatDialog} from "@angular/material/dialog";
import {CustomerChangeInfo} from "../change-info/customer-change-info";
import {CustomerChangeCulture} from "../change-culture/customer-change-culture";
import {CustomerChangeAddress} from "../change-address/customer-change-address";
import {CustomerChangeContact} from "../change-contact/customer-change-contact";
import {CustomerChangePassport} from "../change-passport/customer-change-passport";
import {CustomerChangeStudy} from "../change-study/customer-change-study";
import {CustomerChangeJob} from "../change-job/customer-change-job";

@Component({
  templateUrl: 'customer-home.page.html'
})
export class CustomerHomePage implements OnInit {
  customer: Customer;

  languages: string[] = [];
  hasPassport: string;

  constructor(private _customerService: CustomerService,
              private _route: ActivatedRoute,
              private _dialog: MatDialog) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['customerId'];
    this.customer = await this._customerService.getAsync(id);

    this.languages = this.customer.languages.map(l => LANGUAGES.find(l1 => l1.code == l).title);
    this.hasPassport = this.customer.hasPassport ? 'Oui' : 'Non';
  }

  changePersonInfo() {
    const dialogRef = this._dialog.open(CustomerChangeInfo, { data: {customer: this.customer}})
  }

  changeCulture() {
    const dialogRef = this._dialog.open(CustomerChangeCulture, { data: {customer: this.customer}})
  }

  changeJob() {
    const dialogRef = this._dialog.open(CustomerChangeJob, { data: {customer: this.customer}})
  }


  changeAddress() {
    const dialogRef = this._dialog.open(CustomerChangeAddress, { data: {customer: this.customer}})
  }

  changeContact() {
    const dialogRef = this._dialog.open(CustomerChangeContact, { data: {customer: this.customer}})
  }

  changePassport() {
    const dialogRef = this._dialog.open(CustomerChangePassport, { data: {customer: this.customer}})
    dialogRef.afterClosed().subscribe(() => {
      this.hasPassport = this.customer.hasPassport ? 'Oui' : 'Non';
    });
  }

  changeStudy() {
    const dialogRef = this._dialog.open(CustomerChangeStudy, { data: {customer: this.customer}});
    dialogRef.afterClosed().subscribe(() => {
      this.hasPassport = this.customer.hasPassport ? 'Oui' : 'Non';
    });
  }
}
