import {
  AfterContentInit, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild, ElementRef,
  forwardRef, Input,
  ViewEncapsulation
} from '@angular/core';
import {TextFieldLabel} from '@app/NeoUI';
import {TextFieldInput} from '@app/NeoUI';

@Component({
  selector: 'TextField',
  templateUrl: 'textField.html',
  styleUrls: [ 'textField.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'my-text-field',
    '[class.disabled]': 'disabled',
    '[class.focused]': 'focused',
    '[class.error]': 'error'
  }
})
export class TextField implements AfterContentInit, AfterViewInit {
  private _initialized: boolean = false;

  private _focused: boolean;
  get focused(): boolean { return this._focused }

  private _disabled: boolean;
  get disabled(): boolean { return this._disabled }
  set disabled(value: boolean) {

    if (this._initialized) {
      if (this.contentLabel) {
        this.contentLabel.disabled = value;
      }
      this.inputField.disabled = value;
    }
    this._disabled = value;
  }

  private _floatingLabel: boolean = false
  get floatingLabel(): boolean {
    return this.focused ||  (this.inputFieldHost && this.inputFieldHost.value !== "")
  }

  @ContentChild(forwardRef(() => TextFieldLabel))
  contentLabel: TextFieldLabel;

  @ContentChild(forwardRef(() => TextFieldInput))
  inputField: TextFieldInput;

  @Input()
  error: boolean

  constructor(private _elementRef: ElementRef<HTMLElement>,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this._initialized = true;

    Promise.resolve().then(() => {
      this.disabled = this._disabled;
    });
  }

  ngAfterContentInit(): void {
    if(!this.inputField) {
      throw new Error('The FormField must contains a MsInputField');
    }
    this.inputField.host.addEventListener('focus', this._inputFocusEvent);
    this.inputField.host.addEventListener('blur', this._inputBlurEvent);

    this.changeDetectorRef.markForCheck();
  }


  ngOnDestroy(): void {
    this.inputField.host.removeEventListener('focus', this._inputFocusEvent);
    this.inputField.host.removeEventListener('blur', this._inputBlurEvent);
  }

  private _inputFocusEvent = () => {
    this._focused = true
    console.log("focus")
  };
  private _inputBlurEvent = () => this._focused = false;

  get inputFieldHost(): HTMLInputElement {
    return this.inputField.host;
  }

  get host(): HTMLElement {
    return this._elementRef.nativeElement;
  }
}
