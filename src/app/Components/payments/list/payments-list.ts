import {Component, Input, OnInit} from "@angular/core";
import {DateTime} from "luxon";
import {Payment} from "../../../../entities";
import {PaymentService} from "../../../services";
import {MatTableDataSource} from "@angular/material/table";
import {PaymentUIService} from "../payment-u-i.service";

@Component({
  templateUrl: 'payments-list.html',
  selector: 'PaymentList'
})
export class PaymentsList implements OnInit {
  @Input()
  params: any = {}
  dataSource = new MatTableDataSource<Payment>();

  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  constructor(private _service: PaymentService, private _uiService: PaymentUIService) {
  }

  ngOnInit() {
    this._service.listAsync(this.params).then(items => {
      this.dataSource = new MatTableDataSource<Payment>(items);
    })
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

  onClick(row) {
    console.log(row)
  }
}
