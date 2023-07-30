import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "../../../../services";
import {Agency, Payment} from "../../../../../entities";
import {PaymentUIService} from "../../../../Components/payments";
import {PaymentsList} from "../../../../Components/payments/list/payments-list";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'agency-payments-list.page.html'
})
export class AgencyPaymentsListPage implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  @ViewChild(PaymentsList)
  paymentList: PaymentsList

  agency: Agency;

  constructor(private _service: PaymentService,
              private _parent: AgencyPage,
              private _uiService: PaymentUIService) {
    this.agency = _parent.agency;
  }

  ngOnInit() {
    this._service.listAsync({agencyId: this.agency.id}).then(items => {
      this.payments = items;
    })
  }

  addPayment() {
    this._uiService.addPayment(null).subscribe(payment => {
      if (payment) {
        this.paymentList.unshift(payment);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
