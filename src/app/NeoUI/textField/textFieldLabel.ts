﻿import {Directive} from '@angular/core';

@Directive({
  selector: 'TextFieldLabel, [TextFieldLabel]',
  standalone: true,
  host: {
    'class': 'my-text-field-label'
  }
})
export class TextFieldLabel {
  disabled: boolean = false
}
