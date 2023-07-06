import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "@app/identity";
import {User} from "@app/identity";

@Component({
  templateUrl: 'user-home.page.html'
})
export class UserHomePage {
  user: User;

  constructor(route: ActivatedRoute, private userService: UserService) {
    const userName = route.snapshot.params['userName'];

    userService.getByUserNameAsync(userName).then(user => {
      this.user = user;
    })
  }
}
