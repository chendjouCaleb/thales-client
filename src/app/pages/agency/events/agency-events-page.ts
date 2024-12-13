import {Component} from "@angular/core";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {TraceModule} from "@app/trace";

@Component({
  templateUrl: 'agency-events-page.html',
  selector: 'AgencyEventsPage',
  imports: [
    TraceModule
  ],
  standalone: true
})
export class AgencyEventsPage {
  eventParams:any
  constructor(private parent: AgencyPage) {
    this.eventParams = {publisherId: parent.agency.publisherId}

  }
}
