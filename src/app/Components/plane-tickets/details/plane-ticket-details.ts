import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {PlaneTicketHome} from "@app/Components/plane-tickets/details/home/plane-ticket-home";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {Button} from "@app/ui";
import {DollarSignIcon, LucideAngularModule, PencilIcon, Trash2Icon} from "lucide-angular";
import {PlaneTicketPaymentAdd} from "@app/Components/plane-tickets/add-payment/plane-ticket-payment-add";
import {Dialog} from "@angular/cdk/dialog";
import {PlaneTicketUIService} from "@app/Components";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Payment} from "@entities/payment";

@Component({
  templateUrl: 'plane-ticket-details.html',
  selector: '[PlaneTicketDetails]',
  encapsulation: ViewEncapsulation.None,
  imports: [
    PlaneTicketHome,
    MatProgressSpinner,
    NgIf,
    Button,
    LucideAngularModule,
    PaymentsList
  ],
  standalone: true
})
export class PlaneTicketDetails implements OnInit {
  icons = {PencilIcon, Trash2Icon, DollarSignIcon}

  @Input()
  planeTicketId: number;

  planeTicket: PlaneTicket

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  getPlaneTicketTask = new Task(async () => {
    this.planeTicket = await this.planeTicketService.getByIdAsync(this.planeTicketId)
  })

  constructor(private planeTicketService: PlaneTicketService,
              private _dialog: Dialog,
              private _uiService: PlaneTicketUIService) {
  }

  ngOnInit(): void {
    if (!this.planeTicketId) {
      throw new Error("A planeTicketId is required")
    }

    this.getPlaneTicketTask.launch()
  }

  delete() {
    this._uiService.deletePlaneTicket(this.planeTicket).subscribe(deleted => {
      // if (deleted) {
      //   this._location.back();
      // }
    })
  }

  addPayment() {
    const dialogRef = this._dialog.open<Payment>(PlaneTicketPaymentAdd,
      { data: {planeTicket: this.planeTicket} });

    dialogRef.closed.subscribe(value => {
      if (value) {
        this.paymentList.unshift(value);
      }
    })
  }
}
