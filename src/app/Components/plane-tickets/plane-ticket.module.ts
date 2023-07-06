import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {PlaneTicketList} from "./list/plane-ticket-list";
import {PlaneTicketUIService} from "./plane-ticket-u-i.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ReactiveFormsModule} from "@angular/forms";
import {PlaneTicketDelete} from "./delete/plane-ticket-delete";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule],
  declarations: [ PlaneTicketList, PlaneTicketDelete ],
  exports: [ PlaneTicketList, PlaneTicketDelete ],
  providers: [ PlaneTicketUIService]
})
export class PlaneTicketModule {

}
