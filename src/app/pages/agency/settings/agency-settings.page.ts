import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Agency} from "@entities/agency";
import {AgencyHttpClient} from "@app/services/agency.http-client";
import {AgencyService} from "@app/Components/agencies";
import {AgencyPage} from "@app/pages/agency/agency.page";
import {LucideAngularModule, PencilIcon, Trash2Icon} from "lucide-angular";
import {Button} from "@app/ui";
import {NgIf} from "@angular/common";

@Component({
  templateUrl: 'agency-settings.page.html',
  selector: 'AgencySettingsPage',
  imports: [
    Button,
    LucideAngularModule,
    NgIf
  ],
  standalone: true
})
export class AgencySettingsPage {
  icons = { PencilIcon, Trash2Icon }
  agency: Agency;

  constructor(private route: ActivatedRoute,
              private _parent: AgencyPage,
              private _router: Router,
              private _service: AgencyService,
              private _httpClient: AgencyHttpClient) {}

  async ngOnInit() {
    this.agency = this._parent.agency;
  }

  editName() {
    this._service.changeAgencyName(this.agency);
  }

  editInfo() {
    this._service.editAgency(this.agency);
  }


  delete() {
    this._service.deleteAgency(this.agency).subscribe(deleted => {

    })
  }
}
