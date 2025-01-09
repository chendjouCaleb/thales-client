import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewEncapsulation} from "@angular/core";

@Component({
  template: `
    <div class="button-layout">
      <ng-content></ng-content>
    </div>`,
  selector: 'MyIconButton, [MyIconButton]',
  styleUrl: 'button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  host: {
    class: 'my-icon-button',
    role: 'button',
    '[class.primary]' : "color == 'primary'",
    '[class.warn]' : "color == 'warn'",
    '[class.error]' : "color == 'error'",
    '[class.success]' : "color == 'success'",
  }
})
export class IconButton {

  @Input()
  color: 'primary' | 'warn' | 'success' | 'error'

  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  get host() {
    return this.elementRef.nativeElement;
  }
}
