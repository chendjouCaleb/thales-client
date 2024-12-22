import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AdminPage} from "./admin.page";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavModule} from "@app/Components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {EventsPage} from "./events/events-page";
import {TraceModule} from "@app/trace";
import {PlaneTicketListPage} from "@app/pages/admin/plane-ticket/list/plane-ticket-list.page";
import {SpacePlaneTicketPage} from "@app/pages/admin/plane-ticket/space-plane-ticket.page";
import {SpaceProcedureApply} from "@app/pages/admin/procedure-applies/space-procedure-apply";
import {SpaceProcedureAppliesListPage} from "@app/pages/admin/procedure-applies/space-procedure-applies-list-page";
import {SpaceMembersPage} from "@app/pages/admin/members/list/space-members.page";
import {MemberHomePage} from "@app/pages/admin/members/home/member-home.page";
import {ExpenseListPage} from "@app/pages/admin/expenses/list/expense-list.page";

const routes: Routes = [
  {
    path: '', component: AdminPage, children: [
      { path: 'customers', loadChildren: () => import('./customers/customer.page.module').then(m => m.CustomerPageModule) },
      { path: 'procedures', loadChildren: () => import('./procedures/procedures.page.module').then(m => m.ProceduresPageModule) },
      { path: 'payments', loadChildren: () => import('./payments/payments.page.module').then(m => m.PaymentsPageModule) },
      { path: 'messages', loadChildren: () => import('./messages/messages.page.module').then(m => m.MessagesPageModule) },
      { path: 'plane-tickets', component: PlaneTicketListPage },
      { path: 'plane-tickets/:planeTicketId', component: SpacePlaneTicketPage },
      { path: 'procedure-applies', component: SpaceProcedureAppliesListPage},
      { path: 'procedure-applies/:procedureApplyId', component: SpaceProcedureApply},

      {path: 'expenses', component: ExpenseListPage },

      {path: 'members', component: SpaceMembersPage},
      {path: 'members/:memberId', component: MemberHomePage },

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
    MatSidenavModule, NavModule, MatFormFieldModule, MatInputModule, MatTooltipModule, TraceModule,
  ],
  declarations: [ EventsPage ]
})
export class AdminPageModule {

}
