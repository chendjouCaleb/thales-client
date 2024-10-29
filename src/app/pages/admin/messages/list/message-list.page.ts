import {Component, OnInit, ViewChild} from "@angular/core";
import {MessagesList} from "@app/Components/messages/list/messages-list";
import {Message} from "@entities/message";
import {MessageController} from "@app/Components/messages";

@Component({
  templateUrl: 'message-list.page.html'
})
export class MessageListPage {
  messages: Message[] = [];
  displayedColumns: string[] = ['id', 'amount', 'createdAt', 'reason', 'customer', 'action'];

  @ViewChild(MessagesList)
  messageList: MessagesList

  constructor(private _uiService: MessageController) {
  }

}
