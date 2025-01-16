import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {PlaneTicketOverview} from "@app/Components/plane-tickets/details/overview/plane-ticket-overview";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Location, NgIf} from "@angular/common";
import {Button, IconButton, Menu, MenuItem} from "@app/ui";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  DollarSignIcon, HandCoinsIcon,
  LucideAngularModule,
  PencilIcon,
  Trash2Icon, WalletIcon
} from "lucide-angular";
import {PlaneTicketPaymentAdd} from "@app/Components/plane-tickets/add-payment/plane-ticket-payment-add";
import {Dialog} from "@angular/cdk/dialog";
import {PlaneTicketUIService} from "@app/Components";
import {PaymentsList} from "@app/Components/payments/list/payments-list";
import {Payment} from "@entities/payment";
import {PlaneTicketPager} from "@app/Components/plane-tickets/details/plane-ticket-pager";
import {Dropdown} from "@app/NeoUI";

@Component({
  templateUrl: 'plane-ticket-details.html',
  selector: '[PlaneTicketDetails]',
  encapsulation: ViewEncapsulation.None,
  imports: [
    PlaneTicketOverview,
    MatProgressSpinner,
    NgIf,
    Button,
    LucideAngularModule,
    PaymentsList,
    PlaneTicketPager,
    IconButton,
    Dropdown,
    Menu,
    MenuItem
  ],
  standalone: true
})
export class PlaneTicketDetails implements OnInit {
  icons = {
    PencilIcon, Trash2Icon, DollarSignIcon, ArrowLeftIcon, ChevronDownIcon, HandCoinsIcon, WalletIcon}

  @Input()
  planeTicketId: number;

  planeTicket: PlaneTicket

  @ViewChild(PaymentsList)
  paymentList: PaymentsList;

  getPlaneTicketTask = new Task(async () => {
    this.planeTicket = await this.planeTicketService.getByIdAsync(this.planeTicketId)
  })

  constructor(private planeTicketService: PlaneTicketService,
              public readonly location: Location,
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

  edit() {
    this._uiService.editPlaneTicket(this.planeTicket).subscribe(deleted => {
      // if (deleted) {
      //   this._location.back();
      // }
    })
  }

  addDebt() {
    this._uiService.addDebt(this.planeTicket)
  }

  addExpense() {
    this._uiService.addExpense(this.planeTicket)
  }

  addIncome() {
    this._uiService.addIncome(this.planeTicket)
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
