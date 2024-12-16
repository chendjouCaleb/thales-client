import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "@app/services";
import {Payment} from "@entities/payment";
import {PaymentUIService} from "@app/Components/payments";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";

@Component({
  templateUrl: 'payments-list.page.html',
  selector: 'PaymentsSpaceListPage'
})
export class PaymentsListPage implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  @ViewChild(PaymentsList)
  paymentList: PaymentsList

  space: Space
  constructor(private _service: PaymentService,
              private _uiService: PaymentUIService,
              private parent: AdminPage
              ) {
    this.space = this.parent.space;
  }

  ngOnInit() {

  }

  onClick(row) {
    console.log(row)
  }
}
