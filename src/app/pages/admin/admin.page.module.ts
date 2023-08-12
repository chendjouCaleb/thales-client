import {Component, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AdminPage} from "./admin.page";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavModule} from "@app/Components";
import {ScaffoldModule} from "@app/Components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EventsPage} from "./events/events-page";

const routes: Routes = [
  {
    path: '', component: AdminPage, children: [
      { path: 'customers', loadChildren: () => import('./customers/customer.page.module').then(m => m.CustomerPageModule) },
      { path: 'procedures', loadChildren: () => import('./procedures/procedures.page.module').then(m => m.ProceduresPageModule) },
      { path: 'payments', loadChildren: () => import('./payments/payments.page.module').then(m => m.PaymentsPageModule) },
      { path: 'plane-tickets', loadChildren: () => import('./plane-ticket/plane-ticket.page.module').then(m => m.PlaneTicketPageModule) },
      { path: 'procedure-applies',loadChildren: () => import('./procedure-applies/procedure-apply.page.module').then(m => m.ProcedureApplyPageModule)},
      { path: 'users', loadChildren: () => import('./users/users.page.module').then(m => m.UsersPageModule ) },
      { path: 'settings', loadChildren: () => import('./settings/settings.page.module').then(m => m.SettingsPageModule ) },
      { path: 'events', component: EventsPage },
      { path: '', redirectTo: 'payments', pathMatch: 'full'}
    ]
  }
]

@NgModule({
    imports: [
      CommonModule, MatButtonModule, MatToolbarModule, RouterModule.forChild(routes), MatIconModule,
      MatSidenavModule, NavModule, ScaffoldModule, MatFormFieldModule, MatInputModule, MatTooltipModule
    ],
  declarations: [AdminPage]
})
export class AdminPageModule {

}
