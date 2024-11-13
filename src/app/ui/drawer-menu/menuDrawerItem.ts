import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-drawer-item-layout">
      <ng-content></ng-content>
    </div>`,
  styleUrl: 'menuDrawerItem.scss',
  selector: 'MenuDrawerItem, [MenuDrawerItem]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'menu-drawer-item',
    role: 'menu-item'
  }
})
export class MenuDrawerItem {

}
