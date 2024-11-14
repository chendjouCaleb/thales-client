import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-item-layout">
      <ng-content></ng-content>
    </div>`,
  styleUrl: 'menuItem.scss',
  selector: 'MenuItem, [MenuItem]',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'menu-item',
    role: 'menu-item'
  }
})
export class MenuItem {

}
