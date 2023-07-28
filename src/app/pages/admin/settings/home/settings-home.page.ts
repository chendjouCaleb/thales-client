import {Component, OnInit, ViewChild} from "@angular/core";
import {PaymentService} from "../../../../services";
import {Agency, Payment} from "../../../../../entities";
import {PaymentUIService} from "../../../../Components/payments";
import {PaymentsList} from "../../../../Components/payments/list/payments-list";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {AgencyService} from "@app/Components/agencies";

@Component({
  templateUrl: 'settings-home.page.html'
})
export class SettingsHomePage implements OnInit {
  agencies: Agency[]

  constructor(private agencyService: AgencyService,
              private agencyHttpClient: AgencyHttpClient) {
  }

  ngOnInit() {
    this.loadAgencies()
  }

  async loadAgencies() {
    this.agencies = await this.agencyHttpClient.listAsync();
  }

  addAgency() {
    this.agencyService.addAgency().subscribe(agency => {
      if (agency) {
        this.agencies.unshift(agency);
      }
    })
  }

  onClick(row) {
    console.log(row)
  }
}
