import {Component, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AgencyPage} from "./agency.page";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NavModule} from "@app/Components";
import {ScaffoldModule} from "@app/Components";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {AgencyPaymentsListPage} from "@app/pages/agency/payments/list/agency-payments-list.page";
import {AgencyPlaneTicketListPage} from "@app/pages/agency/plane-ticket/list/agency-plane-ticket-list.page";
import {PaymentModule} from "@app/Components/payments";
import {PlaneTicketModule} from "@app/Components/plane-tickets";

const routes: Routes = [
  {
    path: '', component: AgencyPage, children: [
      { path: 'payments', component: AgencyPaymentsListPage },
      { path: 'plane-tickets', component: AgencyPaymentsListPage },
      { path: '', redirectTo: 'payments', pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatToolbarModule, RouterModule.forChild(routes), MatIconModule,
    MatSidenavModule, NavModule, ScaffoldModule, MatFormFieldModule, MatInputModule, MatTooltipModule, PaymentModule, PlaneTicketModule
  ],
  declarations: [ AgencyPage, AgencyPaymentsListPage, AgencyPlaneTicketListPage ]
})
export class AgencyPageModule {

}
