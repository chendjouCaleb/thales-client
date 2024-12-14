import {Component, OnInit} from "@angular/core";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {AgencyService} from "@app/Components/agencies";
import {BuildingIcon, LucideAngularModule, PlusIcon} from "lucide-angular";
import {Button} from "@app/ui";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  templateUrl: 'settings-home.page.html',
  selector: 'SettingsHomePage',
  imports: [
    Button,
    LucideAngularModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class SettingsHomePage implements OnInit {
  icons = { PlusIcon, BuildingIcon }
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
