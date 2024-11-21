import {LOCALE_ID, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PaymentAdd} from "./add/payment-add";
import {PaymentsList} from "./list/payments-list";
import {PaymentUIService} from "./payment-u-i.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaymentDelete} from "./delete/payment-delete";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CustomerPickerModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {MatSidenavModule} from "@angular/material/sidenav";
import {PaymentDetails} from "./details/payment-details";
import {Home, File, LucideAngularModule, MoveUp, MoveDown} from "lucide-angular";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule, MatSelectModule,
    FormsModule, CustomerPickerModule, MatProgressSpinnerModule, CleaveModule, MatSidenavModule,
    LucideAngularModule.pick({File, Home, MoveUp, MoveDown })
  ],
  declarations: [PaymentAdd, PaymentsList, PaymentDelete, PaymentDetails],
  exports: [PaymentAdd, PaymentsList, PaymentDelete],
  providers: [PaymentUIService, { provide: LOCALE_ID, useValue: 'fr'},]
})
export class PaymentModule {

}
