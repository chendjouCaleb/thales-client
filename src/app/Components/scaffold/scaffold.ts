import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  templateUrl: 'scaffold.html',
  selector: 'th-scaffold, [th-scaffold]',
  styleUrls: ['scaffold.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'th-scaffold'
  }
})
export class Scaffold {

}
