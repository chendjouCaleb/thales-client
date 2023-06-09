import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DialogModule} from "@angular/cdk/dialog";
import {MatSelectModule} from "@angular/material/select";
import {ProcedureApplyAdd} from "./procedure-apply-add.component";
import {MatListModule} from "@angular/material/list";
import {ProcedureApplyDialog} from "./procedure-apply.dialog";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {ProcedureApplyList} from "./list/procedure-apply-list";
import {RouterModule} from "@angular/router";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [CommonModule, DialogModule, MatSelectModule, MatListModule, MatButtonModule, FormsModule, RouterModule, MatProgressSpinnerModule],
  declarations: [ ProcedureApplyAdd, ProcedureApplyList ],
  exports: [ ProcedureApplyList ],
  providers: [ ProcedureApplyDialog]
})
export class ProcedureApplyModule {

}
