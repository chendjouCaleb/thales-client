import {Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'SnackbarTemplate',
  template: `
        <div>{{message}}</div>
  `,
  standalone: true
})
export class SnackbarTemplate {
  message: string = ''

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.message = data.message;
  }
}
