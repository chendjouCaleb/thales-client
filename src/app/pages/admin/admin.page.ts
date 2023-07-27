import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService, Session} from "../../identity";

@Component({
  templateUrl: 'admin.page.html'
})
export class AdminPage implements AfterViewInit {
  // @ts-ignore
  @ViewChild(MatSidenav)
  sideNav: MatSidenav | undefined;

  session: Session

  constructor(private authService: AuthenticationService) {
    this.authService.stateChange.subscribe(isAuth => {
      if (isAuth) {
        this.session = this.authService.session;
      } else {
        this.session = null;
      }
    })
  }


  ngAfterViewInit() {

  }
}
