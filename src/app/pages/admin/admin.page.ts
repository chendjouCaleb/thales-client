import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "@app/identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {MessageHttpClient} from "@app/services/message.service";
import {MessageCountModel} from "@app/models/message-count.model";
import {Space} from "@entities/space";
import {SpaceHttpClient} from "@app/services";
import {Task} from "@app/utils";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {
  LucideAngularModule,
  BuildingIcon,
  UserIcon,
  UsersIcon,
  HistoryIcon,
  SettingsIcon,
  DollarSignIcon, TicketsPlaneIcon, WalletCardsIcon, FileTextIcon
} from "lucide-angular";
import {NavModule, ScaffoldModule} from "@app/Components";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  templateUrl: 'admin.page.html',
  selector: 'AdminPage',
  standalone: true,
  imports: [LucideAngularModule, ScaffoldModule, MatSidenavContainer, MatSidenav, NgIf,
    MatSidenavContent,
    NavModule, MatIcon, RouterLink, RouterOutlet, NgForOf]
})
export class AdminPage implements AfterViewInit, OnInit {
  icons = {BuildingIcon, UsersIcon, HistoryIcon, SettingsIcon,
  TicketsPlaneIcon, DollarSignIcon, WalletCardsIcon, FileTextIcon }
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
