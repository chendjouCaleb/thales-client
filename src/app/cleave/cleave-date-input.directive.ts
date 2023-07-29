import {Directive, ElementRef, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import Cleave from "cleave.js";
import {DateTime} from "luxon";


export const CLEAVE_DATE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CleaveDateInputDirective),
  multi: true
};

@Directive({
  selector: '[CleaveDateInput]',
  providers: [CLEAVE_DATE_CONTROL_VALUE_ACCESSOR],
  host: {
    '[attr.autocomplete]': '\'off\''
  }

})
export class CleaveDateInputDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private _mask: Cleave;

  constructor(private _elementRef: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this._mask = new Cleave(this._elementRef.nativeElement, {
      date: true,
      delimiter: '/',
      datePattern: ['d', 'm', 'Y'],

      onValueChanged: (event: any): void => {
        const time: string = event.target.value;

        const date = DateTime.fromFormat(time, 'DD-MM-YYYY');
        this._onChange(date.toJSDate())
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
      const value = obj.toLocaleDateString();
      this._mask.setRawValue(value);
    }
  }
}
