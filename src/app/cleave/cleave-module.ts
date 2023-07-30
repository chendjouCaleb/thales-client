import {NgModule} from "@angular/core";
import {CleaveDateInputDirective} from "./cleave-date-input.directive";
import {CleaveNumberInputDirective} from "./number-input.directive";

@NgModule({
    exports: [
        CleaveNumberInputDirective,
        CleaveDateInputDirective
    ],
  declarations: [CleaveDateInputDirective, CleaveNumberInputDirective]
})
export class CleaveModule {

}
