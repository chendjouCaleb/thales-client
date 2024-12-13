import {LOCALE_ID, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PaymentUIService} from "./payment-u-i.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {MatSidenavModule} from "@angular/material/sidenav";
import {
  EllipsisVertical,
  File,
  Home,
  LucideAngularModule,
  MoveDown,
  MoveUp,
  Trash2Icon,
  TrashIcon
} from "lucide-angular";
import {Dropdown, TextField, TextFieldInput, TextFieldLabel} from "@app/NeoUI";
import {Button, IconButton, Menu, MenuItem} from "@app/ui";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule, MatSelectModule,
    FormsModule, MatProgressSpinnerModule, CleaveModule, MatSidenavModule,
    LucideAngularModule.pick({
      File,
      Home,
      MoveUp,
      MoveDown,
      EllipsisVertical,
      Trash2Icon,
      TrashIcon
    }), Dropdown, IconButton, Menu, MenuItem, TextField, TextFieldLabel, TextFieldInput, Button
  ],
  declarations: [],
  exports: [],
  providers: [PaymentUIService, { provide: LOCALE_ID, useValue: 'fr'},]
})
export class PaymentModule {

}
