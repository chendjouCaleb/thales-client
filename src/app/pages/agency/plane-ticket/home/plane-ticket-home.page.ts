import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicket} from "@entities/index";
import {PlaneTicketUIService} from "@app/Components";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicketPaymentAdd} from "../add-payment/plane-ticket-payment-add";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Money} from "@entities/money";

@Component({
  templateUrl: 'plane-ticket-home.page.html'
})
export class PlaneTicketHomePage implements OnInit {
  planeTicket: PlaneTicket;

  @ViewChild(PaymentsList)
  paymentList: PaymentsList

  constructor(private _service: PlaneTicketService,
              private _dialog: MatDialog,
              private _uiService: PlaneTicketUIService,
              private _router: Router,
              private _location: Location,
              private _route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this._route.snapshot.params['planeTicketId'];
    this.planeTicket = await this._service.getByIdAsync(id);
  }

  delete() {
    this._uiService.deletePlaneTicket(this.planeTicket).subscribe(deleted => {
      if (deleted) {
        this._location.back();
      }
    })
  }

  addPayment() {
    const dialogRef = this._dialog.open(PlaneTicketPaymentAdd,
      {panelClass: 'panel-class', data: {planeTicket: this.planeTicket}});
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.paymentList.unshift(value);
      }
    })
  }

  get total(): Money | null {
    if(!this.paymentList?._payments)
      return null;
    return new Money(0, 'XAF').add(...this.paymentList._payments.map(p => p.amount));
  }

}
