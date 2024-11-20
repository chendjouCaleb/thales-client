import {Component, OnInit} from "@angular/core";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button, IconButton} from "@app/ui";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "@app/services";
import {Customer} from "@entities/customer";
import {LucideAngularModule, StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon} from 'lucide-angular';
import {Location, NgIf} from '@angular/common';
import {MatTooltip} from "@angular/material/tooltip";
import {CustomerPersonaInput} from "@app/customers/persona/customer-persona-input";
@Component({
  standalone: true,
  imports: [
    CustomerForm,
    Button,
    LucideAngularModule,
    IconButton,
    MatTooltip,
    NgIf,
    CustomerPersonaInput
  ],
  templateUrl: 'customer-home.page.html'
})
export class CustomerHomePage implements OnInit {
  icons = { StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon }
  customer: Customer;
  constructor(private _route: ActivatedRoute,
              public router: Router,
              public location: Location,
              private _customerService: CustomerService) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['customerId'];
    this.customer = await this._customerService.getAsync(id);
  }
}
