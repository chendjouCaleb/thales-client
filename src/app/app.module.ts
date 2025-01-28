import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {ApplicationHttpModule} from "./http";
import {ApplicationServiceModule} from "./services";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {IdentityModule} from "./identity";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr'
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {ErrorCatchingInterceptor} from "@app/http-error.interceptor";


registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ApplicationHttpModule,
    ApplicationServiceModule,
    MatSnackBarModule,
    MatProgressSpinnerModule, IdentityModule, AppComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true
    }
  ],
  bootstrap: []
})
export class AppModule {}
