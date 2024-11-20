import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="menu-container">
      <ng-content></ng-content>
    </div>`,
  selector: 'Menu, MyMenu',
  styleUrl: 'menuItem.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'menu',
    role: 'menu'
  }
})
export class Menu {

}
