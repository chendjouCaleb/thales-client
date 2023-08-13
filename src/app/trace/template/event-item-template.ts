import {Component, Input, OnInit} from "@angular/core";
import {User} from "@app/identity";
import {Agency} from "@entities/agency";
import {DateTime, Duration} from "luxon";
import {Event} from '../models';
import {isSameDay} from "@app/utils";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'event-item-template, [event-item-template]',
  templateUrl: 'event-item-template.html'
})
export class EventItemTemplate implements OnInit {
  @Input()
  event: Event

  @Input()
  user: User;

  @Input()
  agency: Agency;

  @Input()
  createdAt: string;

  @Input()
  icon: string = '';

  @Input()
  color: ThemePalette | null;

  @Input()
  title: string = '';

  ngOnInit() {
    if(isSameDay(this.event.createdAt, DateTime.local())) {
      this.createdAt = this.event.createdAt.toFormat('t');
    } else if(isSameDay(this.event.createdAt, DateTime.local().minus({day: 1}))) {
      this.createdAt = 'Hier, ' + this.event.createdAt.toFormat('t');
    }

    else {
      this.createdAt = this.event.createdAt.toFormat('ff');
    }
  }
}
