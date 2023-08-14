import {Actor} from "./actor";
import {Event} from './event'

export class ActorEvent {
  constructor(value: any = {}) {
    this.id = value.id;
    this.actorId = value.actorId;
    this.eventId = value.eventId;
  }
  id: number;
  actorId: string;
  actor: Actor;

  event: Event;
  eventId: number;
}
