import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {CustomerPicker} from "./customer-picker";
import {MatListModule} from "@angular/material/list";
import {CustomerPickerDialog} from "./customer-picker-dialog.service";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule, FormsModule, MatDialogModule, MatInputModule, MatIconModule],
  declarations: [ CustomerPicker ],
  providers: [ CustomerPickerDialog]
})
export class CustomerPickerModule {

}
