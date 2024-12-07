import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {PlaneTicketUIService} from "@app/Components/plane-tickets";
import {Router} from "@angular/router";
import {AdminPage} from "@app/pages/admin/admin.page";

@Component({
  templateUrl: 'plane-ticket-list.page.html',
  selector: 'SpacePlaneTicketListPage',
  imports: [
    PlaneTicketList
  ],
  standalone: true
})
export class PlaneTicketListPage implements OnInit {
  planeTickets: PlaneTicket[] = [];

  @ViewChild(PlaneTicketList)
  planeTicketList: PlaneTicketList

  constructor(private _service: PlaneTicketService,
              public router: Router,
              public parent: AdminPage,
              private _uiService: PlaneTicketUIService) {
  }

  ngOnInit() { }

  addPlaneTicket() {
    // this._uiService.addPlaneTicket(null).subscribe(planeTicket => {
    //   if (planeTicket) {
    //     this.planeTicketList.unshift(planeTicket);
    //   }
    // })
  }

  onClick(planeTicket: PlaneTicket) {
    this.router.navigate(['/admin', this.parent.space.identifier, 'plane-tickets', planeTicket.id] )
  }
}
