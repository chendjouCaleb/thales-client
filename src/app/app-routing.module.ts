import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./pages/admin/admin.page.module').then(m => m.AdminPageModule)},
  {path: 'identity', loadChildren: () => import('./pages/identity/identity.page.module').then(m => m.IdentityPageModule)},
  {path: '', redirectTo: 'admin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
