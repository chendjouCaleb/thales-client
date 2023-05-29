import {NgModule} from "@angular/core";
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
import {ReactiveFormsModule} from "@angular/forms";
import {PaymentDelete} from "./delete/payment-delete";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule],
  declarations: [ PaymentAdd, PaymentsList, PaymentDelete ],
  exports: [ PaymentAdd, PaymentsList, PaymentDelete ],
  providers: [ PaymentUIService]
})
export class PaymentModule {

}
