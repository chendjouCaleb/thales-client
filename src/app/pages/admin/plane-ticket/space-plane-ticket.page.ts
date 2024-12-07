import {Component} from "@angular/core";
import {AdminPage} from "@app/pages/admin/admin.page";

@Component({
  selector: 'SpacePlaneTicketPage',
  template: `PlaneTicket`,
  standalone: true
})
export class SpacePlaneTicketPage {
  constructor(public readonly parent: AdminPage ) {
  }
}
