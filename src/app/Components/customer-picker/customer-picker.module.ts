import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {CustomerPicker} from "./customer-picker";
import {MatListModule} from "@angular/material/list";
import {CustomerApplyDialog} from "./customer-apply.dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule, FormsModule],
  declarations: [ CustomerPicker ],
  providers: [ CustomerApplyDialog]
})
export class CustomerPickerModule {

}
