import {Component, OnInit, ViewChild} from "@angular/core";
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
import {MatTabGroup} from "@angular/material/tabs";
import {MatTabGroupRemember} from "../../../../utils/mat-tab-remember";

@Component({
  templateUrl: 'customer-index.page.html'
})
export class CustomerIndexPage implements OnInit {
  customer: Customer;

  @ViewChild('tabGroup')
  tabGroup: MatTabGroup;
  tabGroupRemember = new MatTabGroupRemember('customer-index-tab');

  constructor(private _customerService: CustomerService,
              private _route: ActivatedRoute,
              private _dialog: MatDialog) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['customerId'];
    this.customer = await this._customerService.getAsync(id);
    this.tabGroupRemember.attach(this.tabGroup)
  }

}
