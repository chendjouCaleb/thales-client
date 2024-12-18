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
import {TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button} from "@app/ui";
import {SignIn} from "@app/pages/identity/sign-in/sign-in";
import {SignInCode} from "@app/pages/identity/sign-in/code/sign-in-code";
import {SignInInfo} from "@app/pages/identity/sign-in/info/sign-in-info";
import {SignInPassword } from "@app/pages/identity/sign-in/password/sign-in-password";
import {SignInEmail} from "@app/pages/identity/sign-in/email/sign-in-email";

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
  },
  {
    path: 'signin', canActivate: [ IsNotAuthGuardFunc ],
    component: SignIn,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full'},
      { path: 'code', component: SignInCode },
      { path: 'email', component: SignInEmail },
      { path: 'info', component: SignInInfo },
      { path: 'password', component: SignInPassword }

    ]
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, TextField, TextFieldLabel, TextFieldInput, Button]
})
export class IdentityPageModule {

}
