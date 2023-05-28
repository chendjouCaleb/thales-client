import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ResetPasswordEmailPage} from "./email/reset-password-email.page";
import {ResetPasswordCodeGuard, ResetPasswordCodePage} from "./code/reset-password-code.page";
import {ResetPasswordPasswordGuard, ResetPasswordPasswordPage} from "./password/reset-password-password.page";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResetPasswordPage} from "./reset-password.page";
import {ResetPasswordState} from "./reset-password-state";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '', component: ResetPasswordPage, children: [
      {path: 'email', component: ResetPasswordEmailPage},
      {path: 'code', component: ResetPasswordCodePage, canActivate: [ ResetPasswordCodeGuard() ]},
      {path: 'password', component: ResetPasswordPasswordPage, canActivate: [ ResetPasswordPasswordGuard ]},
      {path: '', redirectTo: 'email', pathMatch: 'full'}
    ]
  }

]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule, MatInputModule, MatFormFieldModule,
    ReactiveFormsModule, FormsModule, MatCheckboxModule, MatIconModule ],

  declarations: [ResetPasswordPage, ResetPasswordCodePage, ResetPasswordEmailPage, ResetPasswordPasswordPage],

  providers: [ ResetPasswordState ]
})
export class ResetPasswordPageModule {

}
