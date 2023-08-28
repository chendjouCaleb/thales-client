import {NgModule} from "@angular/core";
import {CleaveDateInputDirective} from "./cleave-date-input.directive";
import {CleaveNumberInputDirective} from "./number-input.directive";
import {CleavePhoneNumberInputDirective} from "@app/cleave/phone-number-input.directive";


@NgModule({
  exports: [
    CleaveNumberInputDirective,
    CleaveDateInputDirective,
    CleavePhoneNumberInputDirective
  ],
  declarations: [CleaveDateInputDirective, CleaveNumberInputDirective, CleavePhoneNumberInputDirective]
})
export class CleaveModule {

}
