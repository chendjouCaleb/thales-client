import {Component, OnInit, ViewChild} from "@angular/core";
import {PlaneTicketService} from "@app/services";
import {Agency, PlaneTicket} from "../../../../../entities";
import {PlaneTicketList} from "@app/Components/plane-tickets/list/plane-ticket-list";
import {BreadcrumbItem, BreadcrumbModule, PlaneTicketUIService} from "@app/Components";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {Router, RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {Button} from "@app/ui";
import {LucideAngularModule, PlusIcon} from "lucide-angular";

@Component({
  templateUrl: 'agency-plane-ticket-list.page.html',
  selector: 'AgencyPlaneTicketListPage',
  imports: [
    BreadcrumbModule,
    RouterLink,
    MatIcon,
    PlaneTicketList,
    Button,
    LucideAngularModule
  ],
  standalone: true
})
export class AgencyPlaneTicketListPage implements OnInit {
  icons = { PlusIcon }

  @ViewChild(PlaneTicketList)
  planeTicketList: PlaneTicketList;

  agency: Agency;

  constructor(private _service: PlaneTicketService,
              private _parent: AgencyPage,
              private _router: Router,
              private _uiService: PlaneTicketUIService) {
    this.agency = _parent.agency;
    if(!this.agency) {
      throw new Error("this.agency cannot be null")
    }
  }

  ngOnInit() {

  }

  addPlaneTicket() {
    this._uiService.addPlaneTicket(this.agency).subscribe(planeTicket => {
      if (planeTicket) {
        this.planeTicketList.unshift(planeTicket);
      }
    })
  }

  onClick(planeTicket: PlaneTicket) {
    this._router.navigate(['/agencies', planeTicket.agencyId, 'plane-tickets', planeTicket.id] )
  }
}
