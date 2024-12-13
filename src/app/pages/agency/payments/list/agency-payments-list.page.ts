import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "@app/services";
import {Agency, Payment} from "../../../../../entities";
import {PaymentUIService} from "@app/Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {MatButton} from "@angular/material/button";
import {LucideAngularModule, PlusIcon} from "lucide-angular";
import {Button} from "@app/ui";

@Component({
  templateUrl: 'agency-payments-list.page.html',
  standalone: true,
  imports: [
    MatButton,
    PaymentsList,
    LucideAngularModule,
    Button
  ],
  selector: 'AgencyPaymentListPage'
})
export class AgencyPaymentsListPage implements OnInit {
  icons = { PlusIcon }
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

  ngOnInit() { }

  addPayment() {
    this._uiService.addPayment(this.agency, null).subscribe(payment => {
      if (payment) {
        this.paymentList.unshift(payment);
      }
    })
  }
}
