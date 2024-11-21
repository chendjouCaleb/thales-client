import {Component, Input, OnInit} from "@angular/core";
import {CustomerForm} from "@app/customers/add/form/customer.form";
import {Button, IconButton} from "@app/ui";
import {
  AlertCircleIcon,
  ArchiveIcon,
  ArchiveXIcon,
  ArrowLeftIcon,
  LucideAngularModule,
  StarIcon,
  Trash2Icon
} from "lucide-angular";
import {MatTooltip} from "@angular/material/tooltip";
import {NgIf} from "@angular/common";
import {CustomerPersonaInput} from "@app/customers/persona/customer-persona-input";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AlertError} from "@app/ui/alert/alert-error";
import {Customer} from "@entities/customer";
import {Task} from "@app/utils";
import {CustomerService} from "@app/services";
import {HorizontalPager, PageContentDef, TabRow, TabRowItem} from "@app/NeoUI";
import {CustomerDetails} from "@app/customers/details/customer-details";
import {PaymentModule, PlaneTicketModule, ProcedureApplyModule} from "@app/Components";
import {TraceModule} from "@app/trace";

@Component({
  standalone: true,
  selector: '[CustomerHomePager]',
  imports: [
    CustomerForm,
    Button,
    LucideAngularModule,
    IconButton,
    MatTooltip,
    NgIf,
    CustomerPersonaInput,
    RouterLink,
    MatProgressSpinner,
    AlertError,
    TabRow,
    TabRowItem,
    HorizontalPager,
    PageContentDef,
    CustomerDetails,
    ProcedureApplyModule,
    PlaneTicketModule,
    TraceModule,
    PaymentModule
  ],
  templateUrl: 'customer-home.pager.html'
})
export class CustomerHomePager implements OnInit {
  icons = {StarIcon, ArrowLeftIcon, Trash2Icon, ArchiveIcon, ArchiveXIcon, AlertCircleIcon}

  @Input()
  customer: Customer;
  customerId: number;
  loadCustomerTask = new Task<Customer>(async () => {
    let customer = await this._customerService.getAsync(this.customerId);
    this.customer = customer;
    return customer;
  })

  constructor(private _route: ActivatedRoute,
              public router: Router,
              private _customerService: CustomerService) {
  }

  async ngOnInit() {

  }
}
