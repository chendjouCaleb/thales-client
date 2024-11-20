import {Directive, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Directive({
  selector: 'input[TextFieldInput]',
  standalone: true,
  host: {
    'class': 'my-text-field-input',
    '[attr.disabled]':'disabled'
  }
})
export class TextFieldInput implements OnDestroy {
  @Input()
  disabled: boolean = false;

  @Output()
  onChange = new EventEmitter<string>();



  constructor(private _elementRef: ElementRef<HTMLInputElement>) {
    _elementRef.nativeElement.addEventListener('change', e => {
      this.onChange.emit((e.target as HTMLInputElement).value)
    })
  }

  ngOnDestroy(): void {

    }


  get host() {
    return this._elementRef.nativeElement;
  }

}
