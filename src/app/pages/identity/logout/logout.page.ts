import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/identity";

@Component({
  template: `<h1>Logout</h1>`
})
export class LogoutPage implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.logoutAsync()
  }
}
