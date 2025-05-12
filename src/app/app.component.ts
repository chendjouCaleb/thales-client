import {Component, Inject} from '@angular/core';
import {AuthenticationService} from "@app/identity";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {DebtEventStore} from "@app/services/debt-event-store";

import { DOCUMENT } from '@angular/common';
import {getCookie, setCookie} from "@app/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatProgressSpinner],
})
export class AppComponent {
  title = 'Thales 360';

  isAuthLoading = true;

  constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
               private _authService: AuthenticationService,
               private debtStateStore: DebtEventStore,
               @Inject(DOCUMENT) private document
               ) {

    this.document.title = this.title;


    this._authService.init().then();
    _authService.stateChange.subscribe(state => {
      this.isAuthLoading = false;
    });

    this.debtStateStore.observeDebt()
  }
}
