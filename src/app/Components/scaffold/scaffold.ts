import {ChangeDetectionStrategy, Component, ContentChild, ViewChild, ViewEncapsulation} from "@angular/core";
import {MatSidenav} from "@angular/material/sidenav";
import {ScaffoldToolbar} from "./toolbar/scaffold-toolbar";

@Component({
  templateUrl: 'scaffold.html',
  selector: 'th-scaffold, [th-scaffold]',
  styleUrls: ['scaffold.scss'],
  standalone: true,
  imports: [ ScaffoldToolbar ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'th-scaffold'
  }
})
export class Scaffold {

  @ContentChild(MatSidenav)
  sidenav: MatSidenav
}
