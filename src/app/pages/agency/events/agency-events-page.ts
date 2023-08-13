import {Component} from "@angular/core";
import {AgencyPage} from "@app/pages/agency/agency.page";

@Component({
  templateUrl: 'agency-events-page.html'
})
export class AgencyEventsPage {
  eventParams:any
  constructor(private parent: AgencyPage) {
    this.eventParams = {publisherId: parent.agency.publisherId}
  }
}
