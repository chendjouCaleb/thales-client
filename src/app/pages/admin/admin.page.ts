import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "../../identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {MessageHttpClient} from "@app/services/message.service";
import {MessageCountModel} from "@app/models/message-count.model";

@Component({
  templateUrl: 'admin.page.html'
})
export class AdminPage implements AfterViewInit, OnInit {
  messageCount: MessageCountModel;
  // @ts-ignore
  @ViewChild(MatSidenav)
  sideNav: MatSidenav | undefined;

  session: Session;

  agencies: Agency[];

  constructor(private authService: AuthenticationService, private agencyService: AgencyHttpClient,
              private messageHttpClient: MessageHttpClient) {
    this.authService.stateChange.subscribe(isAuth => {
      if (isAuth) {
        this.session = this.authService.session;
      } else {
        this.session = null;
      }
    })
  }

  ngOnInit() {
    this.agencyService.listAsync().then(items => {
      this.agencies = items;
    });

    this.messageHttpClient.countAsync().then(result => {
      this.messageHttpClient.messageCount = result;
      this.messageCount = result;
    })
    this.messageHttpClient.messageCountChange.subscribe(() => {
      this.messageCount = this.messageHttpClient.messageCount;
    })
  }


  ngAfterViewInit() {

  }
}
