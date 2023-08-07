import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsAuthGuardFunc, IsNotAuthGuardFunc} from "@app/identity";

const routes: Routes = [
  {
    path: 'admin', canActivate: [IsAuthGuardFunc],
    loadChildren: () => import('./pages/admin/admin.page.module').then(m => m.AdminPageModule)
  },

  {
    path: 'agencies/:agencyId',
    canActivate: [IsAuthGuardFunc],
    loadChildren: () => import('./pages/agency/agency.page.module').then(m => m.AgencyPageModule)
  },
  {
    path: 'identity',
    loadChildren: () => import('./pages/identity/identity.page.module').then(m => m.IdentityPageModule)
  },

  {path: '', redirectTo: 'admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
