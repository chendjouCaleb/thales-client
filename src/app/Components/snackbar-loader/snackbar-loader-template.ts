import {Component, Inject} from "@angular/core";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'snackbar-loader-template',
  template: `
    <div style="display: flex; align-items: center">
      <mat-spinner diameter="24"></mat-spinner>
      <div style="flex-grow: 1; margin-left: 16px">{{message}}</div>
    </div>
  `
})
export class SnackbarLoaderTemplate {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data) {
    this.message = data.message;
  }

}
