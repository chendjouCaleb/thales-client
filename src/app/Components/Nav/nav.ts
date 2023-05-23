import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  templateUrl: 'nav.html',
  selector: 'th-nav',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'th-nav'
  }
})
export class Nav {

}
