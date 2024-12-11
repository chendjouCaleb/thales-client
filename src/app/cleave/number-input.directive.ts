import {Directive, ElementRef, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import Cleave from "cleave.js";


export const CLEAVE_NUMBER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CleaveNumberInputDirective),
  multi: true
};

@Directive({
  selector: '[CleaveNumberInput]',
  providers: [CLEAVE_NUMBER_CONTROL_VALUE_ACCESSOR],
  host: {
    '[attr.autocomplete]': '\'off\''
  }

})
export class CleaveNumberInputDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private _mask: Cleave;

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this._mask = new Cleave(this._elementRef.nativeElement, {
      numeral: true,
      delimiter: ' ',

      onValueChanged: (event: any): void => {
        let value: string = event.target.value;
        let number = parseInt(value.replaceAll(' ', ''));
        this._onChange(number);
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

  writeValue(obj: Date): void {
    if (obj) {
      const value = obj.toString();
      this._mask.setRawValue(value);
    }
  }
}
