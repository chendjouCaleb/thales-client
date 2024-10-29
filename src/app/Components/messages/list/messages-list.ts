import {Component, Inject, Input, OnInit} from "@angular/core";

import {Message} from "@entities/message";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {MessageController} from "../message.controller";
import {MessageHttpClient} from "@app/services/message.service";
import {DateTime} from "luxon";
import {formatDateTime} from "@app/utils";

@Component({
  templateUrl: 'messages-list.html',
  selector: 'MessageList'
})
export class MessagesList implements OnInit {
  @Input()
  params: any = {}

  isLoading = true;

  _messages: Message[]

  constructor(private _service: MessageHttpClient,
              private _router: Router,
              private _uiService: MessageController,
              @Inject(DOCUMENT) private _document: Document) {
  }

  async ngOnInit() {
    let items = await this._service.listAsync(this.params);
    this._messages = items.sort((p1, p2) => p1.id - p2.id);
    this.isLoading = false;
  }

  formatDate(date: DateTime): string {
    return formatDateTime(date)
  }

  unshift(message: Message) {
    this._messages.unshift(message);
  }

  remove(message: Message) {
    this._messages = this._messages.filter(p => p.id !== message.id)
  }

  get messages(): Message[] {
    return this._messages.map(p => p);
  }

  delete(message: Message) {
    this._uiService.deleteMessage(message).subscribe(deleted => {
      if (deleted) {
        this.remove(message);
      }
    })
  }


  onItemClick($event: MouseEvent, message: Message) {
    $event.stopPropagation();
    this.delete(message)
  }
}
