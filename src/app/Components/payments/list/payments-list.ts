import {Component, Inject, Input, OnInit, ViewChild} from "@angular/core";

import {Payment} from "@entities/payment";
import {PaymentService} from "@app/services";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentUIService} from "../payment-u-i.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {environment} from "../../../../environments/environment";
import {MatDrawer} from "@angular/material/sidenav";

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList'
})
export class PaymentsList implements OnInit {
  @Input()
  params: any = {}
  dataSource = new MatTableDataSource<Payment>();
  isLoading = true;

  @ViewChild(MatDrawer)
  drawer: MatDrawer


  displayedColumns: string[] = ['id', 'code',  'amount', 'createdAt', 'reason', 'customer', 'action'];

  constructor(private _service: PaymentService,
              private _router: Router,
              private _uiService: PaymentUIService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    let payments = await this._service.listAsync(this.params);
    payments = payments.sort((p1, p2) => p1.id - p2.id).reverse();
    this.dataSource = new MatTableDataSource<Payment>(payments);

    this.isLoading = false;

  }

  unshift(payment: Payment) {
    this.dataSource.data.unshift(payment);
    this.dataSource = new MatTableDataSource<Payment>(this.dataSource.data);
  }

  remove(payment: Payment) {
    const data = this.dataSource.data.filter(p => p.id !== payment.id)
    this.dataSource = new MatTableDataSource<Payment>(data);
  }

  delete(payment: Payment) {
    this._uiService.deletePayment(payment).subscribe(deleted => {
      if (deleted) {
        this.remove(payment);
      }
    })
  }

  details(payment: Payment) {
    this.drawer.open()
  }

  printPDF(payment: Payment) {
   this._document.defaultView.open(`${environment.serverUrl}/payments/${payment.id}/pdf`, '_blank')
  }

  onClick(row) {
    console.log(row)
  }
}
