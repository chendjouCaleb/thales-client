import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  templateUrl: 'nav.html',
  selector: 'th-nav',
  styleUrls: [ 'nav.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'th-nav'
  }
})
export class Nav {

}
