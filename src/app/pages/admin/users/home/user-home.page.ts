import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../identity/user.service";
import {User} from "../../../../identity";

@Component({
  templateUrl: 'user-home.page.html'
})
export class UserHomePage {
  user: User;

  constructor(route: ActivatedRoute, private userService: UserService) {
    const userName = route.snapshot.params['userName'];

    userService.getByUserName(userName).subscribe(user => {
      this.user = user;
    })
  }
}
