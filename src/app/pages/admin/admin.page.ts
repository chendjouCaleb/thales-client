import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "@app/identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {Space} from "@entities/space";
import {SpaceHttpClient} from "@app/services";
import {Task} from "@app/utils";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {
  BuildingIcon,
  DollarSignIcon,
  FileTextIcon,
  HistoryIcon,
  LucideAngularModule,
  SettingsIcon,
  TicketsPlaneIcon,
  UsersIcon,
  WalletCardsIcon
} from "lucide-angular";
import {NavModule  } from "@app/Components";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Scaffold} from "@app/Components/scaffold";

@Component({
  templateUrl: 'admin.page.html',
  selector: 'AdminPage',
  standalone: true,
  imports: [LucideAngularModule, MatSidenavContainer, MatSidenav, NgIf,
    MatSidenavContent,
    NavModule, MatIcon, RouterLink, RouterOutlet, NgForOf, Scaffold]
})
export class AdminPage implements AfterViewInit, OnInit {
  icons = {BuildingIcon, UsersIcon, HistoryIcon, SettingsIcon,
  TicketsPlaneIcon, DollarSignIcon, WalletCardsIcon, FileTextIcon }

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
              private route: ActivatedRoute) {
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
