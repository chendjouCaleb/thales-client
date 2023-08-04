import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AgencyAdd} from "./add/agency-add";
import {AgencyService} from "./agency.service";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgencyDelete} from "./delete/agency-delete";
import {RouterModule} from "@angular/router";
import {MatSelectModule} from "@angular/material/select";
import {CustomerPickerModule} from "../customer-picker";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AgencyChangeName} from "./change-name/agency-change-name";

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatTableModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatMenuModule, ReactiveFormsModule, RouterModule, MatSelectModule, FormsModule,
    CustomerPickerModule, MatProgressSpinnerModule],
  declarations: [ AgencyAdd, AgencyDelete, AgencyChangeName ],
  exports: [ AgencyAdd, AgencyDelete, AgencyChangeName ],
  providers: [ AgencyService]
})
export class AgencyModule { }
