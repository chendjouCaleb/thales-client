import {ApplicationConfig} from '@angular/core';
import {AuthenticationService, AuthorizationInterceptor, IsAuthGuardFunc} from "@app/identity";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideRouter, Routes} from "@angular/router";
import {provideAnimations} from "@angular/platform-browser/animations";
import {CustomerPage} from "@app/customers";
import {CustomerAllPage} from "@app/customers/list-page/customer-all.page";
import {CustomerFavoritePage} from "@app/customers/list-page/customer-favorite.page";
import {CustomerArchivePage} from "@app/customers/list-page/customer-archive.page";
import {CustomerAddPage} from "@app/customers/add/customer-add.page";
import {CustomerHomePage} from "@app/customers/home/customer-home.page";
import {CustomerEditPage} from "@app/customers/edit/customer-edit.page";

export const routes: Routes = [
  {
    path: 'customers',
    component: CustomerPage,
    children: [
      {path: '', component: CustomerAllPage },
      {path: 'favorites', component: CustomerFavoritePage },
      {path: 'archive', component: CustomerArchivePage },
      {path: 'add', component: CustomerAddPage },
      {path: ':customerId/home', redirectTo: ':customerId', pathMatch: 'full'},
      {path: ':customerId', component: CustomerHomePage},
      {path: ':customerId/edit', component: CustomerEditPage},
    ]
  },
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

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    {provide: AuthenticationService,

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    }
  ]
}
