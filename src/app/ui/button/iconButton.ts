import {ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation} from "@angular/core";

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
    role: 'button'
  }
})
export class IconButton {
  constructor(private elementRef: ElementRef<HTMLElement>) {
  }

  get host() {
    return this.elementRef.nativeElement;
  }
}
