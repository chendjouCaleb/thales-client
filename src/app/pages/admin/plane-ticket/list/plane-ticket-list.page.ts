import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "../../../../services";
import {PlaneTicket} from "../../../../../entities";
import {PlaneTicketList} from "../../../../Components/plane-tickets/list/plane-ticket-list";
import {PlaneTicketUIService} from "../../../../Components/plane-tickets";

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
