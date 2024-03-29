import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "../../identity";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";

@Component({
  templateUrl: 'admin.page.html'
})
export class AdminPage implements AfterViewInit, OnInit {
  // @ts-ignore
  @ViewChild(MatSidenav)
  sideNav: MatSidenav | undefined;

  session: Session;

  agencies: Agency[];

  constructor(private authService: AuthenticationService, private agencyService: AgencyHttpClient) {
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
    })
  }


  ngAfterViewInit() {

  }
}
