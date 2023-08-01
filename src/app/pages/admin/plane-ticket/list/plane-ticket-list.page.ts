import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {PlaneTicket} from "@entities/plane-ticket";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {PlaneTicketUIService} from "@app/Components/plane-tickets";

@Component({
  templateUrl: 'plane-ticket-list.page.html'
})
export class PlaneTicketListPage implements OnInit {
  planeTickets: PlaneTicket[] = [];

  @ViewChild(PlaneTicketList)
  planeTicketList: PlaneTicketList

  constructor(private _service: PlaneTicketService,
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

  onClick(row) {
    console.log(row)
  }
}
