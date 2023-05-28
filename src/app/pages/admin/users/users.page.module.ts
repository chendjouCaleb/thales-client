import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {UserAddPage} from "./add/user-add.page";
import {UsersListPage} from "./list/users-list.page";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {UserHomePage} from "./home/user-home.page";

const routes: Routes = [
  { path: 'add', component: UserAddPage },
  { path: 'list', component: UsersListPage },
  { path: ':userName/home', component: UserHomePage },
  { path: '', redirectTo: 'list', pathMatch: 'full'}
]


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule],
  declarations: [ UserAddPage, UsersListPage, UserHomePage ]
})
export class UsersPageModule {

}
