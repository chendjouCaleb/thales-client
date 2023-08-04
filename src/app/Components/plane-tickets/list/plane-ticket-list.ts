import {Component, Input, OnInit} from "@angular/core";
import {PlaneTicket} from "../../../../entities";
import {PlaneTicketService} from "@app/services";
import {MatTableDataSource} from "@angular/material/table";
import {PlaneTicketUIService} from "@app/Components";

@Component({
  templateUrl: 'plane-ticket-list.html',
  selector: 'PlaneTicketList'
})
export class PlaneTicketList implements OnInit {
  @Input()
  params: any = {}
  dataSource = new MatTableDataSource<PlaneTicket>();

  @Input()
  displayedColumns: string[] = [];
  columns: string[] = [ 'id', 'departureCountry', 'arrivalCountry', 'customer', 'agency', 'employee', 'createdAt', 'action'];

  constructor(private _service: PlaneTicketService, private _uiService: PlaneTicketUIService) {
  }

  ngOnInit() {
    this._service.listAsync(this.params).then(items => {
      this.dataSource = new MatTableDataSource<PlaneTicket>(items);
    });
  }

  unshift(planeTicket: PlaneTicket) {
    this.dataSource.data.unshift(planeTicket);
    this.dataSource = new MatTableDataSource<PlaneTicket>(this.dataSource.data);
  }

  remove(planeTicket: PlaneTicket) {
    const data = this.dataSource.data.filter(p => p.id !== planeTicket.id)
    this.dataSource = new MatTableDataSource<PlaneTicket>(data);
  }

  onClick(row) {
    console.log(row)
  }
}
