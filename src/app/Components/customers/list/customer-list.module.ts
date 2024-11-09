import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CustomerList} from "./customer-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {LucideAngularModule, MoveDown, MoveUp} from "lucide-angular";

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, CleaveModule,
    LucideAngularModule.pick({MoveUp, MoveDown })
  ],
  declarations: [CustomerList],
  exports: [CustomerList],
})
export class CustomerListModule {

}
