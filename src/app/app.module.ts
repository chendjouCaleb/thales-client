import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {ApplicationHttpModule} from "./http";
import {ApplicationServiceModule} from "./services";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthenticationService} from "./identity";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ApplicationHttpModule,
    ApplicationServiceModule,
    MatSnackBarModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _authenticationService: AuthenticationService) {
    this._authenticationService.init()
  }
}
