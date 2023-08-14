import {DateTime} from "luxon";
import {EventListModel} from "../event-list.model";
import {ActorEvent} from "./actor-event";

export class Event {
  id: number;
  createdAt: DateTime;
  name: string = '';
  dataValue: string = '';
  subjectId: string;
  publisherId: string;

  actorEvents: ActorEvent[];

  model: EventListModel

  constructor(value: any = {}) {
    if(value) {
      this.id = value.id;
      this.name = value.name;
      this.createdAt = DateTime.fromISO(value.createdAt, {zone: 'Europe/London'})
      this.dataValue = value.dataValue;
      this.subjectId = value.subjectId;
      this.publisherId = value.publisherId;

      this.actorEvents = value.actorEvents.map(ae => new ActorEvent(ae));
    }
  }
}
