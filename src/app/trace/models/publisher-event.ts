import {Publisher} from "./publisher";
import {Event} from './event';

export class PublisherEvent {
  id: number;

  publisherId: number;
  publisher: Publisher;

  event: Event;
  eventId: number;
}
