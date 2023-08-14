import {Component, Input, OnInit} from "@angular/core";
import {Event} from '../models';
import {User} from "@app/identity";
import {Payment} from "@entities/payment";
import {PlaneTicket} from "@entities/plane-ticket";
import {ProcedureApply} from "@entities/procedure-apply";
import {Customer} from "@entities/customer";

@Component({
  templateUrl: 'event-item.html',
  selector: 'event-item, [event-item]'
})
export class EventItem implements OnInit {
  @Input()
  event: Event;

  user: User;
  createdAt: string;
  payment: Payment;
  planeTicket: PlaneTicket;
  procedureApply: ProcedureApply;
  customer: Customer;

  subjectUser: User;

  ngOnInit() {
    const model = this.event.model;
    this.user = this.event.model.users.find(u => u.actorId == this.event.actorEvents[0].actorId);
    this.payment = model.payments.find(p => p.subjectId == this.event.subjectId);
    this.planeTicket = model.planeTickets.find(p => p.subjectId == this.event.subjectId);
    this.procedureApply = model.procedureApplies.find(p => p.subjectId == this.event.subjectId);
    this.customer = model.customers.find(p => p.subjectId == this.event.subjectId);
    this.subjectUser = model.users.find(u => u.subjectId == this.event.subjectId);
  }
}
