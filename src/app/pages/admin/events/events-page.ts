import {Component} from "@angular/core";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Space} from "@entities/space";

@Component({
  templateUrl: 'events-page.html'
})
export class EventsPage {
  space: Space
  constructor(private parent: AdminPage) {
    this.space = parent.space;
  }
}
