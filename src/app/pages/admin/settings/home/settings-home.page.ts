import {Component, OnInit} from "@angular/core";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {AgencyService} from "@app/Components/agencies";
import {BuildingIcon, LucideAngularModule, PlusIcon} from "lucide-angular";
import {Button} from "@app/ui";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Space} from "@entities/space";
import {AdminPage} from "@app/pages/admin/admin.page";
import {Task} from "@app/utils";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SpaceEditProfileLauncher} from "@app/pages/admin/settings/edit-profile/space-edit-profile.launcher";

@Component({
  templateUrl: 'settings-home.page.html',
  selector: 'SettingsHomePage',
  imports: [
    Button,
    LucideAngularModule,
    NgIf,
    NgForOf,
    RouterLink,
    MatProgressSpinner
  ],
  standalone: true,
  providers: [ SpaceEditProfileLauncher ]
})
export class SettingsHomePage implements OnInit {
  icons = { PlusIcon, BuildingIcon }
  agencies: Agency[];
  space: Space

  constructor(private agencyService: AgencyService,
              private agencyHttpClient: AgencyHttpClient,
              private editProfileLauncher: SpaceEditProfileLauncher,
              private parentPage: AdminPage) {
    this.space = parentPage.space;
  }

  ngOnInit() {
    this.loadAgencies()
  }

  async loadAgencies() {
    this.getAgencyListTask.launch()
  }

  addAgency() {
    this.agencyService.addAgency(this.space).subscribe(agency => {
      if (agency) {
        this.agencies.unshift(agency);
      }
    })
  }

  getAgencyListTask = new Task(async() => {
    this.agencies = await this.agencyHttpClient.listAsync({spaceId: this.space.id});
  })

  onClick(row) {
    console.log(row)
  }

  editProfile() {
    this.editProfileLauncher.launch(this.space)
  }
}
