import {Publisher} from "./publisher";
import {Event} from './event';

export class PublisherEvent {
  constructor(value: any = {}) {
    this.id = value.id;
    this.publisher = value.publisherId;
    this.eventId = value.eventId;
  }

  id: number;

  publisherId: number;
  publisher: Publisher;

  event: Event;
  eventId: number;
}
