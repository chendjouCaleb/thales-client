import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackbarLoaderTemplate} from "./snackbar-loader-template";
import {SnackbarLoader} from "./snackbar-loader";

@NgModule({
  imports: [ MatProgressSpinnerModule, MatSnackBarModule ],
  declarations: [ SnackbarLoaderTemplate ],
  providers: [ SnackbarLoader ]
})
export class SnackbarLoaderModule {

}
