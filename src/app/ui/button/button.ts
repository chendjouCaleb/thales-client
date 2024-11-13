import {ChangeDetectionStrategy, Component, ViewEncapsulation} from "@angular/core";

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
    role: 'menu'
  }
})
export class Button {

}
