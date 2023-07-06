import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "../../../../services";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaneTicket} from "../../../../../entities";
import {PlaneTicketUIService} from "../../../../Components/plane-tickets";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PlaneTicketPaymentAdd} from "../add-payment/plane-ticket-payment-add";
import {PaymentsList} from "../../../../Components/payments/list/payments-list";

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
}
