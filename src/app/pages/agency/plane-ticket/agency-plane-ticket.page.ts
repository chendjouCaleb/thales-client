import {Component} from "@angular/core";
import {PlaneTicketDetails} from "@app/Components/plane-tickets/details/plane-ticket-details";
import {ActivatedRoute} from "@angular/router";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  selector: 'AgencyPlaneTicketPage',
  template: `
    <div PlaneTicketDetails [planeTicketId]="planeTicketId" class="p-4"></div>`,
  imports: [
    PlaneTicketDetails
  ],
  standalone: true
})
export class AgencyPlaneTicketPage {
  planeTicketId: number

  constructor(public readonly parent: AgencyPage, route: ActivatedRoute ) {
    this.planeTicketId = route.snapshot.params['planeTicketId']
  }
}
