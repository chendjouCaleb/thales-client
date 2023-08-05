import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "@app/identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {ActivatedRoute} from "@angular/router";
import {Breadcrumb, BreadcrumbItem} from "@app/Components";

@Component({
  templateUrl: 'agency.page.html'
})
export class AgencyPage implements AfterViewInit, OnInit {
  // @ts-ignore
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
