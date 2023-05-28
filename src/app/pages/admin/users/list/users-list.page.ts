import {Component} from "@angular/core";
import {UserService} from "../../../../identity/user.service";
import {User} from "../../../../identity";

@Component({
  templateUrl: 'users-list.page.html'
})
export class UsersListPage {
  users: User[] = [];
  displayedColumns: string[] = ['fullName', 'email', 'userName', 'action'];

  constructor(private userService: UserService) {

    userService.list().subscribe(items => {
      this.users = items;
    })
  }
}
