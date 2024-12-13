import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "@app/identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {BreadcrumbItem, NavModule, Scaffold } from "@app/Components";
import {
  BuildingIcon,
  DollarSignIcon, FileTextIcon,
  HistoryIcon, LucideAngularModule,
  SettingsIcon,
  TicketsPlaneIcon,
  UsersIcon,
  WalletCardsIcon
} from "lucide-angular";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'agency.page.html',
  selector: 'AgencyPage',
  imports: [
    MatSidenavContainer,
    MatSidenavContent,
    MatSidenav,
    NavModule,
    RouterLink,
    LucideAngularModule,
    RouterOutlet,
    NgIf,
    Scaffold
  ],
  standalone: true
})
export class AgencyPage implements AfterViewInit, OnInit {
  icons = {BuildingIcon, UsersIcon, HistoryIcon, SettingsIcon,
    TicketsPlaneIcon, DollarSignIcon, WalletCardsIcon, FileTextIcon }

  @ViewChild(MatSidenav)
  sideNav: MatSidenav | undefined;

  session: Session;

  agency: Agency;

  breadcrumbItems: BreadcrumbItem[];

  constructor(private authService: AuthenticationService,
              private agencyService: AgencyHttpClient,
              private activeRoute: ActivatedRoute) {
    this.authService.stateChange.subscribe(isAuth => {
      if (isAuth) {
        this.session = this.authService.session;
      } else {
        this.session = null;
      }
    })
  }

  async ngOnInit() {
    const agencyId = +this.activeRoute.snapshot.params['agencyId'];
    this.agency = await this.agencyService.getByIdAsync(agencyId);

    this.breadcrumbItems = [
      new BreadcrumbItem('Acceuil', '/admin'),
      new BreadcrumbItem(this.agency.name, `/agencies/${this.agency.id}`)
    ]
  }

  ngAfterViewInit() {

  }
}
