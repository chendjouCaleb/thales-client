import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/identity";
import {Router} from "@angular/router";

@Component({
  template: `<h3>Logout</h3>`,
  selector: 'LogoutPage',
  standalone: true,

})
export class LogoutPage implements OnInit {
  constructor(private authService: AuthenticationService, private _router: Router) {}

  async ngOnInit() {
    await this.authService.logoutAsync();
    this._router.navigateByUrl('/identity/login').then();
  }
}
