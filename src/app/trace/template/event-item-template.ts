import {Component, Input, OnInit} from "@angular/core";
import {User} from "@app/identity";
import {Agency} from "@entities/agency";
import {Event} from '../models';
import {formatDateTime} from "@app/utils";
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

  metas: string[] = []

  ngOnInit() {
    this.createdAt = formatDateTime(this.event.createdAt)

    this.metas = [this.user?.fullName, this.agency?.name, this.createdAt]
  }

  hasBullet(index: number) {
    if(index == this.metas.length - 1) {
      return false;
    }
    if(!this.metas[index])
      return false;
    while(index > -1) {
      if(this.metas[index]){
        return true;
      }

      index -= 1;
    }
    return false;
  }
}
