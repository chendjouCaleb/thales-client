import {Component} from "@angular/core";
import {AdminPage} from "@app/pages/admin/admin.page";
import {PlaneTicketDetails} from "@app/Components/plane-tickets/details/plane-ticket-details";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'SpacePlaneTicketPage',
  template: `
    <div PlaneTicketDetails [planeTicketId]="planeTicketId"></div>`,
  imports: [
    PlaneTicketDetails
  ],
  standalone: true
})
export class SpacePlaneTicketPage {
  planeTicketId: number

  constructor(public readonly parent: AdminPage, route: ActivatedRoute ) {
    this.planeTicketId = route.snapshot.params['planeTicketId']
  }
}
