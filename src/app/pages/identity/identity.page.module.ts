import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {LoginPage} from "./login/login.page";
import {LogoutPage} from "./logout/logout.page";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {IsAuthGuardFunc, IsNotAuthGuardFunc} from "@app/identity";

const routes: Routes = [
  {path: 'login', component: LoginPage, canActivate: [IsNotAuthGuardFunc]},
  {path: 'logout', component: LogoutPage, canActivate: [IsAuthGuardFunc]},
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.page.module').then(m => m.ProfilePageModule),
    canActivate: [IsAuthGuardFunc]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.page.module').then(m => m.ResetPasswordPageModule),
    canActivate: [IsNotAuthGuardFunc]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  declarations: [LoginPage, LogoutPage]
})
export class IdentityPageModule {

}
