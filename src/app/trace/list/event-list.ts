import {Component, Input, OnInit} from "@angular/core";
import {TraceService} from "../trace-service";
import {Event} from '../models';

@Component({
  templateUrl: 'event-list.html',
  selector: 'event-list, [event-list]'
})
export class EventList implements OnInit {
  @Input()
  params: any = {};

  isLoading = true;

  events: Event[]

  constructor(private _traceService: TraceService) {}

  ngOnInit() {
    this.loadEvents();
  }

  async loadEvents() {
    this.isLoading = true;
    const eventListModel = await this._traceService.listAsync();
    this.events = eventListModel.events;
    this.isLoading = false;
  }


}
