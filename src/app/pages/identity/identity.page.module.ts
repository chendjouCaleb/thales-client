import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginPage} from "./login/login.page";
import {LogoutPage} from "./logout/logout.page";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

const routes: Routes = [
  {path: 'login', component: LoginPage },
  {path: 'logout', component: LogoutPage },
  {path: 'profile', loadChildren: () => import('./profile/profile.page.module').then(m => m.ProfilePageModule)}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  declarations: [ LoginPage, LogoutPage ]
})
export class IdentityModule {

}
