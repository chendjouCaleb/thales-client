import {Directive, ElementRef, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import Cleave from "cleave.js";
import 'cleave.js/dist/addons/cleave-phone.cm';

export const CLEAVE_PHONE_NUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CleavePhoneNumberInputDirective),
  multi: true
};

@Directive({
  selector: '[CleavePhoneNumberInput]',
  providers: [CLEAVE_PHONE_NUMBER_CONTROL_VALUE_ACCESSOR],
  host: {
    '[attr.autocomplete]': '\'off\''
  }

})
export class CleavePhoneNumberInputDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private _mask: Cleave;

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this._mask = new Cleave(this._elementRef.nativeElement, {
      phone: true,
      phoneRegionCode: 'CM',

      onValueChanged: (event: any): void => {
        let value: string = event.target.value;
        let phoneNumber = value.replaceAll(' ', '');
        this._onChange(phoneNumber);
      }
    });
  }

  ngOnDestroy(): void {
    this._mask.destroy();
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => { };

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => { };

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  writeValue(value: string): void {
    if (value) {
      this._mask.setRawValue(value);
    }
  }
}
