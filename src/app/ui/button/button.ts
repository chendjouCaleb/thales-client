import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="button-layout">
      <ng-content></ng-content>
    </div>`,
  selector: 'MyButton, [MyButton]',
  styleUrl: 'button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-button',
    role: 'menu',
    '[class.primary]' : "color == 'primary'",
    '[class.warn]' : "color == 'warn'"
  }
})
export class Button {
  @Input()
  color: 'primary' | 'warn'
}
