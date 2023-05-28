import {Component, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AdminPage} from "./admin.page";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavModule} from "../../Components/Nav";
import {ScaffoldModule} from "../../Components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
  {
    path: '', component: AdminPage, children: [
      { path: 'customers', loadChildren: () => import('./customers/customer.page.module').then(m => m.CustomerPageModule) },
      { path: 'procedures', loadChildren: () => import('./procedures/procedures.page.module').then(m => m.ProceduresPageModule) },
      { path: 'users', loadChildren: () => import('./users/users.page.module').then(m => m.UsersPageModule ) }
    ]
  }
]

@NgModule({
    imports: [CommonModule, MatButtonModule, MatToolbarModule, RouterModule.forChild(routes), MatIconModule,
        MatSidenavModule, NavModule, ScaffoldModule, MatFormFieldModule, MatInputModule, MatTooltipModule,],
  declarations: [AdminPage]
})
export class AdminPageModule {

}
