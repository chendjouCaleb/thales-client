import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {LucideAngularModule, MoveDown, MoveUp} from "lucide-angular";

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, CleaveModule,
    LucideAngularModule.pick({MoveUp, MoveDown })
  ]
})
export class CustomerListModule {

}
