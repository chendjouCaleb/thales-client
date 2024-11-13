import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-drawer-container">
      <ng-content></ng-content>
    </div>`,
  selector: 'MenuDrawer',
  styleUrl: 'menuDrawerItem.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'menu-drawer',
    role: 'menu'
  }
})
export class MenuDrawer {

}
