import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "../../identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {MessageHttpClient} from "@app/services/message.service";
import {MessageCountModel} from "@app/models/message-count.model";
import {Space} from "@entities/space";
import {SpaceHttpClient} from "@app/services";
import {Task} from "@app/utils";
import {ActivatedRoute} from "@angular/router";

@Component({
  templateUrl: 'admin.page.html'
})
export class AdminPage implements AfterViewInit, OnInit {
  messageCount: MessageCountModel;
  // @ts-ignore
  @ViewChild(MatSidenav)
  sideNav: MatSidenav | undefined;

  space: Space
  session: Session;

  agencies: Agency[];

  getSpaceTask = new Task(async () => {
    const identifier = this.route.snapshot.params['identifier'];
    this.space = await this.spaceService.getByIdentifierAsync(identifier);
  });

  constructor(private authService: AuthenticationService,
              private agencyService: AgencyHttpClient,
              private spaceService: SpaceHttpClient,
              private route: ActivatedRoute,
              private messageHttpClient: MessageHttpClient) {
    this.authService.stateChange.subscribe(isAuth => {
      if (isAuth) {
        this.session = this.authService.session;
      } else {
        this.session = null;
      }
    })
  }



  async ngOnInit() {
    await this.getSpaceTask.launch()
    this.agencyService.listAsync().then(items => {
      this.agencies = items;
    });
  }


  ngAfterViewInit() {

  }
}
