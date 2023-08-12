import {Actor} from "./actor";
import {Event} from './event'

export class ActorEvent {
  id: number;
  actorId: string;
  actor: Actor;

  event: Event
}
