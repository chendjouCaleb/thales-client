import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "@app/services";
import {Agency, Payment} from "../../../../../entities";
import {PaymentUIService} from "@app/Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {BreadcrumbItem} from "@app/Components";

@Component({
  templateUrl: 'agency-payments-list.page.html'
})
export class AgencyPaymentsListPage implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  @ViewChild(PaymentsList)
  paymentList: PaymentsList

  agency: Agency;
  breadcrumbItems: BreadcrumbItem[];

  constructor(private _service: PaymentService,
              private _parent: AgencyPage,
              private _uiService: PaymentUIService) {
    this.agency = _parent.agency;
  }

  ngOnInit() {


    this.breadcrumbItems = [...this._parent.breadcrumbItems,
      new BreadcrumbItem('Paiements')
    ];
  }

  addPayment() {
    this._uiService.addPayment(this.agency, null).subscribe(payment => {
      if (payment) {
        this.paymentList.unshift(payment);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
