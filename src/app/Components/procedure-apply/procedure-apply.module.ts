import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {ProcedureApplyList} from "./list/procedure-apply-list";
import {RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NavigationModule} from "@app/navigation";
import {ProcedureApplyAddProcedure} from "./add/procedure-apply-add-procedure";
import {ProcedureApplyAddCustomer} from "./add/procedure-apply-add-customer";
import {ProcedureApplyAdd} from "./add/procedure-apply-add";
import {ProcedureApplyController} from "./procedure-apply.controller";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ProcedureApplyAddConfirm} from "./add/procedure-apply-add-confirm";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule, FormsModule, RouterModule, MatProgressSpinnerModule, NavigationModule, MatIconModule, MatDialogModule, MatInputModule],
  declarations: [ ProcedureApplyAdd, ProcedureApplyAddProcedure, ProcedureApplyAddCustomer, ProcedureApplyList, ProcedureApplyAddConfirm ],
  exports: [ ProcedureApplyList ],
  providers: [ ProcedureApplyController ]
})
export class ProcedureApplyModule { }
