import {Component, OnInit} from "@angular/core";
import {Message} from "@entities/message";
import {MessageHttpClient} from "@app/services/message.service";
import {ActivatedRoute} from "@angular/router";
import {BreadcrumbItem} from "@app/Components";
import {DateTime} from "luxon";

@Component({
  templateUrl: 'message-home.page.html'
})
export class MessageHomePage implements OnInit {
  message: Message;
  breadcrumbItems: BreadcrumbItem[] = [];


  constructor(private _messageHttpClient: MessageHttpClient,
              private _route: ActivatedRoute) {
  }

  async ngOnInit() {
    const messageId = this._route.snapshot.params['messageId'];
    this.message = await this._messageHttpClient.getAsync(messageId);

    this.breadcrumbItems = [
      new BreadcrumbItem('Messages', `/admin/messages`),
      new BreadcrumbItem(`Message ${this.message.id}`)
    ];

    if(!this.message.isRead) {
      this._messageHttpClient.readAsync(this.message).then(() => {
        this.message.readAt = DateTime.now()
        //this._messageHttpClient.messageCount.nonRead =-1;
        //this._messageHttpClient.messageCountChange.next({});
      })
    }

  }
}
