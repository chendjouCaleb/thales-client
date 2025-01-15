import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {RouterLink} from "@angular/router";
import {PlaneTicket} from "@entities/index";
import {PlaneTicketUIService} from "@app/Components";
import {CurrencyPipe, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Money} from "@entities/money";
import {PlaneTicketPaymentAdd} from "@app/Components/plane-tickets/add-payment/plane-ticket-payment-add";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton} from "@angular/material/button";
import {Button} from "@app/ui";
import {ArrowLeftIcon, DollarSignIcon, LucideAngularModule, PencilIcon, Trash2Icon} from "lucide-angular";

@Component({
  templateUrl: 'plane-ticket-overview.html',
  selector: 'PlaneTicketOverview, [PlaneTicketOverview]',
  imports: [

    RouterLink,
    PaymentsList,
    NgIf,
    MatAnchor,
    Button,
    LucideAngularModule
  ],
  standalone: true
})
export class PlaneTicketOverview implements OnInit {
  icons = {
    PencilIcon, Trash2Icon, DollarSignIcon
  }
  @Input()
  planeTicket: PlaneTicket;


  constructor(private _service: PlaneTicketService,
              private _dialog: MatDialog,
              private _uiService: PlaneTicketUIService) {
  }

  async ngOnInit() {

  }

}
