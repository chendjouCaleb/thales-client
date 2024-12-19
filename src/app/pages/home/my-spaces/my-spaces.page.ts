import {Component, inject, OnInit, ViewEncapsulation} from "@angular/core";
import {SpaceHttpClient} from "@app/services";
import {Task} from "@app/utils";
import {Space} from "@entities/space";
import {RouterLink} from "@angular/router";

import {LucideAngularModule, BuildingIcon, PlusIcon } from 'lucide-angular';
import {Button} from "@app/ui";
import {SpaceAddLauncher} from "@app/Components/space/add/space-add-launcher";
import {Scaffold, ScaffoldToolbar} from "@app/Components/scaffold";


@Component({
  templateUrl: 'my-spaces.page.html',
  styleUrls: [ 'my-spaces.page.scss'],
  selector: 'MySpaces',
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    LucideAngularModule,
    Button,
    Scaffold,
    ScaffoldToolbar
  ],
  standalone: true
})
export class MySpacesPage implements OnInit {
  private _spaceService = inject(SpaceHttpClient);
  public spaceAddLauncher = inject(SpaceAddLauncher)
  spaces: Space[] = [];
  icons = { BuildingIcon, PlusIcon }

  getSpaceTask = new Task(async () => {
    this.spaces = await this._spaceService.listMySpacesAsync();
  });

  ngOnInit() {
    this.getSpaceTask.launch()
  }
}
