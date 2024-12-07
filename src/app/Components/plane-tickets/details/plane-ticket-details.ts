import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {PlaneTicketHome} from "@app/Components/plane-tickets/details/home/plane-ticket-home";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'plane-ticket-details.html',
  selector: '[PlaneTicketDetails]',
  encapsulation: ViewEncapsulation.None,
  imports: [
    PlaneTicketHome,
    MatProgressSpinner,
    NgIf
  ],
  standalone: true
})
export class PlaneTicketDetails implements OnInit {
  @Input()
  planeTicketId: number;

  planeTicket: PlaneTicket

  getPlaneTicketTask = new Task(async () => {
    this.planeTicket = await this.planeTicketService.getByIdAsync(this.planeTicketId)
  })

  constructor(private planeTicketService: PlaneTicketService) {
  }

  ngOnInit(): void {
    if (!this.planeTicketId) {
      throw new Error("A planeTicketId is required")
    }

    this.getPlaneTicketTask.launch()
  }
}
