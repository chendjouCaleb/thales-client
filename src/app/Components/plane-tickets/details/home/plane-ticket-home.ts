import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PlaneTicket} from "@entities/index";
import {BreadcrumbItem, PlaneTicketUIService} from "@app/Components";
import {CurrencyPipe, Location, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Money} from "@entities/money";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {Task} from "@app/utils";
import {PlaneTicketPaymentAdd} from "@app/Components/plane-tickets/add-payment/plane-ticket-payment-add";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton} from "@angular/material/button";

@Component({
  templateUrl: 'plane-ticket-home.html',
  selector: 'PlaneTicketHome',
  imports: [
    MatIcon,
    MatButton,
    RouterLink,
    PaymentsList,
    CurrencyPipe,
    NgIf,
    MatAnchor
  ],
  standalone: true
})
export class PlaneTicketHome implements OnInit {
  @Input()
  planeTicket: PlaneTicket;

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;


  constructor(private _service: PlaneTicketService,
              private _dialog: MatDialog,
              private _uiService: PlaneTicketUIService) {
  }

  async ngOnInit() {

  }

  delete() {
    this._uiService.deletePlaneTicket(this.planeTicket).subscribe(deleted => {
      // if (deleted) {
      //   this._location.back();
      // }
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
    if(!this.paymentList?.payments)
      return null;
    return new Money(0, 'XAF').add(...this.paymentList.payments.map(p => p.amount));
  }

}
