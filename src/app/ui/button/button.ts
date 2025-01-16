import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation} from "@angular/core";

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
  exportAs: 'my-button',
  host: {
    class: 'my-button',
    role: 'menu',
    '[class.primary]': "color == 'primary'",
    '[class.warn]': "color == 'warn'",
    '[class.error]': "color == 'error'",
    '[class.success]': "color == 'success'",
  }
})
export class Button {
  @Input()
  color: 'primary' | 'warn' | 'success' | 'error';

  get host(): HTMLElement {
    return this._elementRef.nativeElement
  }

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }
}
