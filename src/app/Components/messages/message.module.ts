import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MessagesList} from "./list/messages-list";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageDelete} from "./delete/message-delete";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CustomerPickerModule} from "@app/Components";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CleaveModule} from "@app/cleave";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MessageController} from "./message.controller";

@NgModule({
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
        MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule, MatSelectModule, FormsModule,
      CustomerPickerModule, MatProgressSpinnerModule, CleaveModule, MatSidenavModule],
  declarations: [ MessagesList, MessageDelete ],
  exports: [ MessagesList, MessageDelete ],
  providers: [ MessageController ]
})
export class MessageModule {

}
