import {Component, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AgencyPage} from "./agency.page";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavModule, ProcedureApplyModule} from "@app/Components";
import {ScaffoldModule} from "@app/Components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AgencyPaymentsListPage} from "./payments/list/agency-payments-list.page";
import {AgencyPlaneTicketListPage} from "./plane-ticket/list/agency-plane-ticket-list.page";
import {PaymentModule} from "@app/Components/payments";
import {PlaneTicketModule} from "@app/Components/plane-tickets";
import {AgencyEmployeesPage} from "./employees/agency-employees.page";
import {EmployeeModule} from "@app/Components/employees";
import {AgencySettingsPage} from "./settings/agency-settings.page";
import {AgencyModule} from "@app/Components/agencies";

const routes: Routes = [
  {
    path: '', component: AgencyPage, children: [
      {path: 'payments', component: AgencyPaymentsListPage},
      {path: 'employees', component: AgencyEmployeesPage},
      {
        path: 'plane-tickets',
        loadChildren: () => import('./plane-ticket/agency-plane-ticket.page.module').then(m => m.AgencyPlaneTicketPageModule)
      },
      {
        path: 'procedure-applies',
        loadChildren: () => import('./procedure-apply/agency-procedure-apply.page.module').then(m => m.AgencyProcedureApplyPageModule)
      },
      {path: 'settings', component: AgencySettingsPage},
      {path: '', redirectTo: 'payments', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule, RouterModule.forChild(routes), MatIconModule,
    MatSidenavModule, NavModule, ScaffoldModule, MatFormFieldModule, MatInputModule, MatTooltipModule,
    PaymentModule, PlaneTicketModule, EmployeeModule, AgencyModule, ProcedureApplyModule
  ],
  declarations: [AgencyPage, AgencyPaymentsListPage, AgencyEmployeesPage, AgencySettingsPage]
})
export class AgencyPageModule {

}
